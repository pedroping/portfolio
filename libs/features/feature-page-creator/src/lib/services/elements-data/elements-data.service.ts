import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IElement } from '../../models/elements-interfaces';

@Injectable({ providedIn: 'root' })
export class ElementsData {
  elements$ = new BehaviorSubject<IElement[]>([]);
  draggingBoundaryElement!: HTMLElement;

  setDraggingBoundaryElement(elementRef: HTMLElement) {
    this.draggingBoundaryElement = elementRef;
  }

  pushElement(element: IElement) {
    this.elements$.next([...this.elements$.value, element]);
  }

  removeElement(id: number) {
    const filteredElements = this.elements$.value.filter(
      (element) => element.id != id
    );
    this.elements$.next(filteredElements);
  }

  findIndexElement(id: number) {
    return this.elements$.value.findIndex((item) => item.id == id);
  }
}
