import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBasicElement, IElement } from '../../models/elements-interfaces';

@Injectable({ providedIn: 'root' })
export class ElementsData {
  elements$ = new BehaviorSubject<IElement[]>([]);
  basicElements$ = new BehaviorSubject<IBasicElement[]>([]);
  draggingBoundaryElement$ = new BehaviorSubject<HTMLElement | null>(null);

  setDraggingBoundaryElement(element: HTMLElement) {
    this.draggingBoundaryElement$.next(element.parentElement as HTMLElement);
  }

  pushElement(id: number, name: string, element: IElement) {
    this.elements$.next([...this.elements$.value, element]);
    this.basicElements$.next([...this.basicElements$.value, { id, name }]);
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

  findElement(id: number) {
    return this.elements$.value.find((item) => item.id == id);
  }

  findElementIndex(id: number) {
    return this.elements$.value.findIndex((item) => item.id == id);
  }
}
