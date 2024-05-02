import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBasicElement, IElement } from '../../models/elements-interfaces';

@Injectable({ providedIn: 'root' })
export class ElementsData {
  draggingBoundaryElement!: HTMLElement;
  elements$ = new BehaviorSubject<IElement[]>([]);
  basicElements$ = new BehaviorSubject<IBasicElement[]>([]);

  setDraggingBoundaryElement(element: HTMLElement) {
    this.draggingBoundaryElement = element.parentElement as HTMLElement;
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

  findElement(id: number) {
    return this.elements$.value.find((item) => item.id == id);
  }

  findIndexElement(id: number) {
    return this.elements$.value.findIndex((item) => item.id == id);
  }
}
