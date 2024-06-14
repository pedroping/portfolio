import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomElementAdpter } from '@portifolio/utils/util-adpters';
import { ELEMENT_PADDING } from '../../mocks/elements.mocks';
import { IPageConfig } from '../../models/elements-interfaces';
import { ElementsData } from '../elements-data/elements-data.service';
import { SetZIndexService } from '../set-z-index/set-z-index.service';

@Injectable({ providedIn: 'root' })
export class PageActionsService {
  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly elementsData: ElementsData,
    private readonly setZIndexService: SetZIndexService
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
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        DomElementAdpter.removeTransition(element);
      });
  }

  private showElement(elmentConfig: IPageConfig) {
    elmentConfig.opened = true;
    const element = elmentConfig.element$.value;

    if (!element) return;

    this.elementsData.openElement(elmentConfig.id);

    DomElementAdpter.setTransition(element);
    element.style.display = 'block';
    this.setZIndexService.setNewZIndex(elmentConfig.id, element);

    if (elmentConfig.isFullScreen) {
      DomElementAdpter.setTransform(
        element,
        -ELEMENT_PADDING,
        -ELEMENT_PADDING
      );
      return;
    }

    DomElementAdpter.setTransform(
      element,
      elmentConfig.lastPosition.x,
      elmentConfig.lastPosition.y
    );

    DomElementAdpter.afterTransitions(element)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        element.style.display = 'block';
        DomElementAdpter.removeTransition(element);
      });
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
