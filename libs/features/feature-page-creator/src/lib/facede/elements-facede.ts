import { Injectable, ViewContainerRef } from '@angular/core';
import { IInitialConfig } from '../models/elements-interfaces';
import { ElementCreatorService } from '../services/element-creator/element-creator.service';
import { ElementsData } from '../services/elements-data/elements-data.service';

@Injectable({ providedIn: 'root' })
export class ElementsFacede<T = unknown> {
  constructor(
    private readonly elementsData: ElementsData,
    private readonly elementCreatorService: ElementCreatorService<T>
  ) {}

  startCreator(vcr: ViewContainerRef) {
    this.elementCreatorService.startCreator(vcr);
  }

  createElement(id: number, data: T, config: IInitialConfig) {
    this.elementCreatorService.createElement(id, data, config);
  }

  destroyElement(id: number) {
    this.elementCreatorService.destroyElement(id);
  }

  setDraggingBoundaryElement(elementRef: HTMLElement) {
    this.elementsData.setDraggingBoundaryElement(elementRef);
  }

  get elements$() {
    return this.elementsData.elements$;
  }

  get draggingBoundaryElement() {
    return this.elementsData.draggingBoundaryElement;
  }
}
