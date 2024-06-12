import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  IBasicElement,
  IElementReference,
} from '../../models/elements-interfaces';

@Injectable({ providedIn: 'root' })
export class ElementsData {
  elements$ = new BehaviorSubject<IElementReference[]>([]);
  basicElements$ = new BehaviorSubject<IBasicElement[]>([]);
  draggingBoundaryElement$ = new BehaviorSubject<HTMLElement | null>(null);
  anyElementEvent$ = new BehaviorSubject<boolean>(false);

  setDraggingBoundaryElement(element: HTMLElement) {
    this.draggingBoundaryElement$.next(element.parentElement as HTMLElement);
  }

  pushElement(
    id: number,
    name: string,
    icon: string,
    element: IElementReference
  ) {
    this.elements$.next([...this.elements$.value, element]);
    this.basicElements$.next([
      ...this.basicElements$.value,
      { id, name, icon, opened: element.opened },
    ]);
  }

  removeElement(id: number) {
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
    const openedElement = this.basicElements$.value.find(
      (val) => val.id === id
    );
    if (!openedElement) return;

    openedElement.opened = true;
  }

  hideElement(id: number) {
    const openedElement = this.basicElements$.value.find(
      (val) => val.id === id
    );
    if (!openedElement) return;

    openedElement.opened = false;
  }

  findElement(id: number) {
    return this.elements$.value.find((item) => item.id == id);
  }

  findElementIndex(id: number) {
    return this.elements$.value.findIndex((item) => item.id == id);
  }

  setAnyElementEvent(val: boolean) {
    this.anyElementEvent$.next(val);
  }

  clearData() {
    this.elements$.next([]);
    this.basicElements$.next([]);
    this.anyElementEvent$.next(false);
  }
}
