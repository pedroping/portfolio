import { Injectable } from '@angular/core';
import { IBasicElement, IPageConfig } from '@portifolio/utils/util-models';
import { BehaviorSubject } from 'rxjs';
import { ELEMENT_BASE_ICON } from '../../mocks/elements.mocks';

@Injectable({ providedIn: 'root' })
export class ElementsData {
  elements$ = new BehaviorSubject<IPageConfig[]>([]);
  basicElements$ = new BehaviorSubject<IBasicElement[]>([]);

  pushElement(element: IPageConfig) {
    this.elements$.next([...this.elements$.value, element]);
    this.basicElements$.next([
      ...this.basicElements$.value,
      this.getNewBasicElement(element),
    ]);
  }

  removeElement(id: number) {
    const element = this.elements$.value.find((val) => val.id === id);
    element?.onDestroy$.next();

    const filteredElements = this.elements$.value.filter(
      (element) => element.id != id
    );
    const filteredBasicElements = this.basicElements$.value.filter(
      (element) => element.id != id
    );

    this.elements$.next(filteredElements);
    this.basicElements$.next(filteredBasicElements);
  }

  isOnlyElementOpened(id: number) {
    const isOnlyElement = this.elements$.value
      .filter((item) => item.id != id)
      .filter((item) => !!item.opened);

    return isOnlyElement.length <= 0;
  }

  openElement(id: number) {
    const basicElement = this.findBasicElement(id);
    const element = this.findElement(id);

    if (!basicElement || !element) return;

    element.opened = true;
    basicElement.opened = true;
    basicElement.onMaximaze$.next();
  }

  hideElement(id: number) {
    const basicElement = this.findBasicElement(id);
    const element = this.findElement(id);

    if (!basicElement || !element) return;

    element.opened = false;
    basicElement.opened = false;
    basicElement.onMinimize$.next();
  }

  findElement(id: number) {
    return this.elements$.value.find((item) => item.id == id);
  }

  findBasicElement(id: number) {
    return this.basicElements$.value.find((item) => item.id == id);
  }

  findElementIndex(id: number) {
    return this.elements$.value.findIndex((item) => item.id == id);
  }

  clearData() {
    this.elements$.next([]);
    this.basicElements$.next([]);
  }

  private getNewBasicElement(element: IPageConfig) {
    return {
      id: element.id,
      name: element.name,
      icon: element.icon ?? ELEMENT_BASE_ICON,
      opened: element.opened,
      onDestroy$: element.onDestroy$,
      onMaximaze$: element.onMaximaze$,
      onMinimize$: element.onMinimize$,
    };
  }
}
