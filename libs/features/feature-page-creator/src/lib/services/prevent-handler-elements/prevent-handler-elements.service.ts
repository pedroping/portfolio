import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PreventHandlerElements {
  private preventHandlerElements: HTMLElement[] = [];

  pushElement(element: HTMLElement) {
    this.preventHandlerElements.push(element);
  }

  hasElement(element: HTMLElement) {
    return !!this.preventHandlerElements.find((preventElment) => {
      return preventElment === element || preventElment.contains(element);
    });
  }
}
