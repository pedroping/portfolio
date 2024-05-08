import { Injectable } from '@angular/core';
import {
  DomElementAdpter,
  UtlisFunctions,
} from '@portifolio/utils/util-adpters';
import { IElement } from '../../models/elements-interfaces';
import { ElementsData } from '../elements-data/elements-data.service';
import { SetZIndexService } from '../set-z-index/set-z-index.service';

@Injectable({ providedIn: 'root' })
export class PageActionsService {
  constructor(
    private readonly elementsData: ElementsData,
    private readonly setZIndexService: SetZIndexService
  ) {}

  openElement(id: number) {
    const elementReference = this.elementsData.findElement(id);
    if (!elementReference) return;
    if (!elementReference.opened) return this.showElement(elementReference);
    this.validateElementPosition(elementReference);
  }

  private validateElementPosition(elementReference: IElement) {
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

  private minimizeElement(elementReference: IElement) {
    const element = elementReference.element$.value;
    if (!element) return;

    const index = this.elementsData.findElementIndex(elementReference.id);
    elementReference.opened = false;

    DomElementAdpter.setOnlyTransformTransition(element, 5);
    DomElementAdpter.setTransform(
      element,
      (index + 1) * 20,
      window.innerHeight * 2.5
    );

    UtlisFunctions.timerSubscription(100).subscribe(() => {
      DomElementAdpter.removeTransition(element);
    });
  }

  private showElement(elementReference: IElement) {
    elementReference.opened = true;
    const element = elementReference.element$.value;

    if (!element) return;

    element.style.display = 'block';
    DomElementAdpter.setOnlyTransformTransition(element, 1);

    this.setZIndexService.setNewZIndex(elementReference.id, element);

    UtlisFunctions.timerSubscription(50).subscribe(() => {
      if (elementReference.isFullScreen) {
        DomElementAdpter.setTransform(element, 0, 0);
        return;
      }

      DomElementAdpter.setTransform(
        element,
        elementReference.lastPosition.x,
        elementReference.lastPosition.y
      );

      UtlisFunctions.timerSubscription(1000).subscribe(() => {
        element.style.display = 'block';
        DomElementAdpter.removeTransition(element);
      });
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
