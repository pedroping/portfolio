import { Injectable } from '@angular/core';
import {
  DomElementAdpter,
  UtlisFunctions,
} from '@portifolio/util/util-adpters';
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
    const isHiggerElement = elementReference.id == this.higgestElementId;
    const elements = this.elementsData.elements$.value;
    const element = elementReference.element;

    const isOnlyElement = elements
      .filter((item) => item != elementReference)
      .filter((item) => !!item.opened);

    const isBehindAnotherElement = elements
      .filter((item) => item.id != elementReference.id)
      .filter((item) => !!item.opened)
      .map(
        (item) =>
          DomElementAdpter.elementAboveOther(item.element, element) &&
          DomElementAdpter.validateFullScreen(item.element, element)
      )
      .find((result) => !!result);

    const onFullScreenAndNotBigger =
      elementReference.isFullScreen && !isHiggerElement;
    const hasNoOtherElement = isOnlyElement.length <= 0;

    if (hasNoOtherElement) return this.minimizeElement(elementReference);

    if (
      (isBehindAnotherElement && !isHiggerElement) ||
      onFullScreenAndNotBigger
    )
      return DomElementAdpter.setZIndex(
        element,
        this.setZIndexService.setNewZIndex(element.id)
      );

    this.minimizeElement(elementReference);
  }

  private minimizeElement(elementReference: IElement) {
    const element = elementReference.element;
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
      element.style.display = 'none';
    });
  }

  private showElement(elementReference: IElement) {
    elementReference.opened = true;

    const element = elementReference.element;

    DomElementAdpter.setOnlyTransformTransition(element, 1);
    DomElementAdpter.setZIndex(
      element,
      this.setZIndexService.setNewZIndex(elementReference.id)
    );
    element.style.display = 'block';

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

  private get higgestElementId() {
    const idsAndZIndez = this.elementsData.elements$.value
      .filter((item) => !!item.opened)
      .map((item) => ({
        id: item.id,
        zIndez: item.element.style.zIndex || 0,
      }));

    const maxZindex = Math.max(...idsAndZIndez.map((item) => +item.zIndez));

    const element = idsAndZIndez.find((item) => item.zIndez == maxZindex);

    return element?.id;
  }
}
