import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomElementAdpter } from '@portifolio/utils/util-adpters';
import { ELEMENT_PADDING } from '../../mocks/elements.mocks';
import { IElementReference } from '../../models/elements-interfaces';
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
    const elementReference = this.elementsData.findElement(id);
    if (!elementReference) return;
    if (!elementReference.opened) return this.showElement(elementReference);
    this.validateElementPosition(elementReference);
  }

  private validateElementPosition(elementReference: IElementReference) {
    const isHiggerElement =
      elementReference.id == this.setZIndexService.getHiggestElementId();
    const element = elementReference.element$.value;

    if (!element) return;

    const isBehindAnotherElement = this.getIsBehindAnotherElement(
      elementReference.id,
      element
    );

    const onFullScreenAndNotBigger =
      elementReference.isFullScreen && !isHiggerElement;

    const hasNoOtherElement = this.elementsData.isOnlyElementOpened(
      elementReference.id
    );

    if (hasNoOtherElement) return this.minimizeElement(elementReference);

    if (onFullScreenAndNotBigger)
      return this.setZIndexService.setNewZIndex(elementReference.id, element);

    if (isBehindAnotherElement && !isHiggerElement)
      return this.setZIndexService.setNewZIndex(elementReference.id, element);

    this.minimizeElement(elementReference);
  }

  private minimizeElement(elementReference: IElementReference) {
    const element = elementReference.element$.value;
    if (!element) return;

    const index = this.elementsData.findElementIndex(elementReference.id);
    elementReference.opened = false;
    this.elementsData.hideElement(elementReference.id);

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

  private showElement(elementReference: IElementReference) {
    elementReference.opened = true;
    const element = elementReference.element$.value;

    if (!element) return;

    this.elementsData.openElement(elementReference.id);

    DomElementAdpter.setTransition(element);
    element.style.display = 'block';
    this.setZIndexService.setNewZIndex(elementReference.id, element);

    if (elementReference.isFullScreen) {
      DomElementAdpter.setTransform(
        element,
        -ELEMENT_PADDING,
        -ELEMENT_PADDING
      );
      return;
    }

    DomElementAdpter.setTransform(
      element,
      elementReference.lastPosition.x,
      elementReference.lastPosition.y
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
