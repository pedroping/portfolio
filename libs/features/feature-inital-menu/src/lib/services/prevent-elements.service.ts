import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PreventElementsService {
  preventElements: HTMLElement[] = [];

  pushElement(element: HTMLElement) {
    this.preventElements.push(element);
  }

  hasElement(element: HTMLElement) {
    return this.preventElements.some(
      (preventElement) =>
        preventElement.contains(element) || preventElement == element,
    );
  }
}
