import { Injectable } from '@angular/core';
import { IPageConfig } from '@portifolio/utils/util-models';
import { WorkspaceReferenceFacade } from '@portifolio/utils/util-workspace-reference';
import { take } from 'rxjs';
import { DomElementAdpter } from '../../adapters/dom-element-adpter';
import { ELEMENT_PADDING } from '../../mocks/elements.mocks';
import { ElementsData } from '../elements-data/elements-data.service';
import { SetZIndexService } from '../set-z-index/set-z-index.service';

@Injectable({ providedIn: 'root' })
export class PageActionsService {
  constructor(
    private readonly elementsData: ElementsData,
    private readonly setZIndexService: SetZIndexService,
    private readonly workspaceReferenceFacade: WorkspaceReferenceFacade,
  ) {}

  validateElementOpened(id: number) {
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

    const onFullScreenAndNotBigger =
      elmentConfig.isFullScreen && !isHiggerElement;

    if (onFullScreenAndNotBigger)
      return this.setZIndexService.setNewZIndex(elmentConfig.id, element);

    const hasNoOtherElement = this.elementsData.isOnlyElementOpened(
      elmentConfig.id,
    );

    if (hasNoOtherElement) return this.minimizeElement(elmentConfig);

    const isBehindAnotherElement = this.getIsBehindAnotherElement(
      elmentConfig.id,
      element,
    );

    if (isBehindAnotherElement && !isHiggerElement)
      return this.setZIndexService.setNewZIndex(elmentConfig.id, element);

    this.minimizeElement(elmentConfig);
  }

  private minimizeElement(elementConfig: IPageConfig) {
    const element = elementConfig.element$.value;
    if (!element) return;

    const index = this.elementsData.findElementIndex(elementConfig.id);
    this.elementsData.hideElement(elementConfig.id);

    DomElementAdpter.setOnlyTransformTransition(element, 5);
    DomElementAdpter.setTransform(
      element,
      (index + 1) * 20,
      window.innerHeight * 2.5,
    );

    DomElementAdpter.afterTransitions(element)
      .pipe(take(1))
      .subscribe(() => {
        DomElementAdpter.removeTransition(element);
      });
  }

  private showElement(elmentConfig: IPageConfig) {
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

    this.setMaxPosition(elmentConfig);

    DomElementAdpter.afterTransitions(element)
      .pipe(take(2))
      .subscribe(() => {
        DomElementAdpter.removeTransition(element);
        this.setZIndexService.setNewZIndex(elmentConfig.id, element);
      });
  }

  setMaxPosition(elmentConfig: IPageConfig) {
    const element = elmentConfig.element$.value;
    const boundaryElement = this.workspaceReferenceFacade.element;

    if (!element) return;

    if (boundaryElement) {
      const boundaryHeight = boundaryElement.offsetHeight + ELEMENT_PADDING * 2;
      const boundaryWidth = boundaryElement.offsetWidth + ELEMENT_PADDING * 2;
      const height = element.offsetHeight;
      const width = element.offsetWidth;

      const maxBoundX = Math.max(0, boundaryWidth - element.offsetWidth);
      const maxBoundY = Math.max(0, boundaryHeight - element.offsetHeight);

      const minHeight = elmentConfig.baseSizes.minHeight;
      const minWidth = elmentConfig.baseSizes.minWidth;

      if (minHeight)
        elmentConfig.baseSizes.minHeight = Math.min(minHeight, boundaryHeight);

      if (minWidth)
        elmentConfig.baseSizes.minWidth = Math.min(minWidth, boundaryWidth);

      element.style.height = Math.min(height, boundaryHeight) + 'px';
      element.style.width = Math.min(width, boundaryWidth) + 'px';
      element.style.minWidth = elmentConfig.baseSizes.minWidth + 'px';
      element.style.minHeight = elmentConfig.baseSizes.minHeight + 'px';

      elmentConfig.lastPosition.x = Math.min(
        Math.max(elmentConfig.lastPosition.x, 0),
        maxBoundX,
      );
      elmentConfig.lastPosition.y = Math.min(
        Math.max(elmentConfig.lastPosition.y, 0),
        maxBoundY,
      );
    }

    DomElementAdpter.setTransform(
      element,
      elmentConfig.lastPosition.x,
      elmentConfig.lastPosition.y,
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
          DomElementAdpter.validateFullScreen(item.element$.value, element),
      )
      .find((result) => !!result);
  }
}
