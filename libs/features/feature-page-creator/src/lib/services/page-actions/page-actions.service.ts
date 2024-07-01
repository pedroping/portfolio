import { Injectable } from '@angular/core';
import { DomElementAdpter } from '@portifolio/utils/util-adpters';
import { IPageConfig } from '@portifolio/utils/util-models';
import { WorkspaceReferenceFacade } from '@portifolio/utils/util-workspace-reference';
import { take } from 'rxjs';
import { ELEMENT_PADDING } from '../../mocks/elements.mocks';
import { ElementsData } from '../elements-data/elements-data.service';
import { SetZIndexService } from '../set-z-index/set-z-index.service';

@Injectable({ providedIn: 'root' })
export class PageActionsService {
  constructor(
    private readonly elementsData: ElementsData,
    private readonly setZIndexService: SetZIndexService,
    private readonly workspaceReferenceFacade: WorkspaceReferenceFacade
  ) {}

  openElement(id: number) {
    const elmentConfig = this.elementsData.findElement(id);
    if (!elmentConfig) return;
    if (!elmentConfig.opened) return this.showElement(elmentConfig);
    this.validateElementPosition(elmentConfig);
  }

  private validateElementPosition(elmentConfig: IPageConfig) {
    const isHiggerElement =
      elmentConfig.id == this.setZIndexService.getHiggestElementId();
    const element = elmentConfig.element$.value;

    if (!element) return;

    const isBehindAnotherElement = this.getIsBehindAnotherElement(
      elmentConfig.id,
      element
    );

    const onFullScreenAndNotBigger =
      elmentConfig.isFullScreen && !isHiggerElement;

    const hasNoOtherElement = this.elementsData.isOnlyElementOpened(
      elmentConfig.id
    );

    if (hasNoOtherElement) return this.minimizeElement(elmentConfig);

    if (onFullScreenAndNotBigger)
      return this.setZIndexService.setNewZIndex(elmentConfig.id, element);

    if (isBehindAnotherElement && !isHiggerElement)
      return this.setZIndexService.setNewZIndex(elmentConfig.id, element);

    this.minimizeElement(elmentConfig);
  }

  private minimizeElement(elmentConfig: IPageConfig) {
    const element = elmentConfig.element$.value;
    if (!element) return;

    const index = this.elementsData.findElementIndex(elmentConfig.id);
    elmentConfig.opened = false;
    this.elementsData.hideElement(elmentConfig.id);

    DomElementAdpter.setOnlyTransformTransition(element, 5);
    DomElementAdpter.setTransform(
      element,
      (index + 1) * 20,
      window.innerHeight * 2.5
    );

    DomElementAdpter.afterTransitions(element)
      .pipe(take(1))
      .subscribe(() => {
        DomElementAdpter.removeTransition(element);
      });
  }

  private showElement(elmentConfig: IPageConfig) {
    elmentConfig.opened = true;
    const element = elmentConfig.element$.value;

    if (!element) return;

    this.elementsData.openElement(elmentConfig.id);

    element.style.display = 'block';
    DomElementAdpter.setTransition(element);

    if (elmentConfig.isFullScreen) {
      DomElementAdpter.setTransform(element, 0, 0);

      DomElementAdpter.afterTransitions(element).subscribe(() => {
        this.setZIndexService.setNewZIndex(elmentConfig.id, element);
      });
      return;
    }

    this.setMaxPosition({ elmentConfig });

    DomElementAdpter.afterTransitions(element)
      .pipe(take(2))
      .subscribe(() => {
        DomElementAdpter.removeTransition(element);
        this.setZIndexService.setNewZIndex(elmentConfig.id, element);
      });
  }

  setMaxPosition(params: {
    elmentConfig: IPageConfig;
    x?: number;
    y?: number;
  }) {
    if (params.x && params.y)
      params.elmentConfig.lastPosition = { x: params.x, y: params.y };

    const element = params.elmentConfig.element$.value;
    const boundaryElement = this.workspaceReferenceFacade.element;

    if (!element) return;

    if (boundaryElement) {
      const boundaryHeight = boundaryElement.offsetHeight + ELEMENT_PADDING * 2;
      const boundaryWidth = boundaryElement.offsetWidth + ELEMENT_PADDING * 2;
      const height = element.offsetHeight;
      const width = element.offsetWidth;

      const maxBoundX = Math.max(0, boundaryWidth - element.offsetWidth);
      const maxBoundY = Math.max(0, boundaryHeight - element.offsetHeight);

      if (params.elmentConfig.baseSizes.minHeight)
        params.elmentConfig.baseSizes.minHeight = Math.min(
          params.elmentConfig.baseSizes.minHeight,
          boundaryHeight
        );

      if (params.elmentConfig.baseSizes.minWidth)
        params.elmentConfig.baseSizes.minWidth = Math.min(
          params.elmentConfig.baseSizes.minWidth,
          boundaryWidth
        );

      element.style.height = Math.min(height, boundaryHeight) + 'px';
      element.style.width = Math.min(width, boundaryWidth) + 'px';
      element.style.minWidth = params.elmentConfig.baseSizes.minWidth + 'px';
      element.style.minHeight = params.elmentConfig.baseSizes.minHeight + 'px';

      params.elmentConfig.lastPosition.x = Math.min(
        Math.max(params.elmentConfig.lastPosition.x, 0),
        maxBoundX
      );
      params.elmentConfig.lastPosition.y = Math.min(
        Math.max(params.elmentConfig.lastPosition.y, 0),
        maxBoundY
      );
    }

    DomElementAdpter.setTransform(
      element,
      params.elmentConfig.lastPosition.x,
      params.elmentConfig.lastPosition.y
    );
  }

  private getIsBehindAnotherElement(id: number, element: HTMLElement) {
    return !!this.elementsData.elements$.value
      .filter((item) => item.id != id)
      .filter((item) => !!item.opened)
      .map(
        (item) =>
          item.element$.value &&
          DomElementAdpter.elementAboveOther(item.element$.value, element) &&
          DomElementAdpter.validateFullScreen(item.element$.value, element)
      )
      .find((result) => !!result);
  }
}
