import { Injectable, ViewContainerRef } from '@angular/core';
import {
  IDomElementOptions,
  IInitialConfig,
} from '../models/elements-interfaces';
import { ElementCreatorService } from '../services/element-creator/element-creator.service';
import { ElementsData } from '../services/elements-data/elements-data.service';
import { PageEvents } from '../services/page-events/page-events.service';
import { PreventHandlerElements } from '../services/prevent-handler-elements/prevent-handler-elements.service';
import { SetZIndexService } from '../services/set-z-index/set-z-index.service';
import { PageActionsService } from '../services/page-actions/page-actions.service';

@Injectable({ providedIn: 'root' })
export class ElementsFacede<T = unknown> {
  constructor(
    private readonly pageEvents: PageEvents,
    private readonly elementsData: ElementsData,
    private readonly setZIndexService: SetZIndexService,
    private readonly pageActionsService: PageActionsService,
    private readonly preventHandlerElements: PreventHandlerElements,
    private readonly elementCreatorService: ElementCreatorService<T>
  ) {}

  startCreator(vcr: ViewContainerRef) {
    this.elementCreatorService.startCreator(vcr);
  }

  createElement(
    data: T,
    config: IInitialConfig,
    domElementOptions?: IDomElementOptions
  ) {
    this.elementCreatorService.createElement(data, config, domElementOptions);
  }

  destroyElement(id: number) {
    this.elementCreatorService.destroyElement(id);
  }

  setDraggingBoundaryElement(elementRef: HTMLElement) {
    this.elementsData.setDraggingBoundaryElement(elementRef);
  }

  openElement(id: number) {
    this.pageActionsService.openElement(id);
  }

  findElementIndex(id: number) {
    return this.elementsData.findElementIndex(id);
  }

  pushPreventHandlerElement(element: HTMLElement) {
    this.preventHandlerElements.pushElement(element);
  }

  hasPreventElement(element: HTMLElement) {
    return this.preventHandlerElements.hasElement(element);
  }

  isBiggestElement(id: string | number) {
    return this.setZIndexService.isBiggestElement(id);
  }

  setNewZIndex(id: number | string) {
    return this.setZIndexService.setNewZIndex(id);
  }

  get elements$() {
    return this.elementsData.elements$;
  }

  get basicElements$() {
    return this.elementsData.basicElements$;
  }

  get draggingBoundaryElement$() {
    return this.elementsData.draggingBoundaryElement$;
  }
}
