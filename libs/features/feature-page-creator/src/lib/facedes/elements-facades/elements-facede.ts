import { Injectable, ViewContainerRef } from '@angular/core';
import {
  IDomElementOptions,
  IInitialConfig,
  IPageConfig,
} from '@portifolio/utils/util-models';
import { ElementCreatorService } from '../../services/element-creator/element-creator.service';
import { ElementsData } from '../../services/elements-data/elements-data.service';
import { PageActionsService } from '../../services/page-actions/page-actions.service';
import { PreventHandlerElements } from '../../services/prevent-handler-elements/prevent-handler-elements.service';
import { SetZIndexService } from '../../services/set-z-index/set-z-index.service';

@Injectable({ providedIn: 'root' })
export class ElementsFacede<T = unknown> {
  constructor(
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
    return this.elementCreatorService.createElement(
      data,
      config,
      domElementOptions
    );
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

  hideElement(id: number) {
    this.elementsData.hideElement(id);
  }

  getElement(id: number): IPageConfig | undefined {
    return this.elements$.value.find((element) => element.id === id);
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

  setNewZIndex(id: number | string, element?: HTMLElement) {
    return this.setZIndexService.setNewZIndex(id, element);
  }

  getHiggestElementId() {
    return this.setZIndexService.getHiggestElementId();
  }

  isOnlyElementOpened(id: number) {
    return this.elementsData.isOnlyElementOpened(id);
  }

  setAnyElementEvent(val: boolean) {
    this.elementsData.setAnyElementEvent(val);
  }

  clearAll() {
    this.elementCreatorService.clearData();
    this.elementsData.clearData();
    this.setZIndexService.clearData();
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

  get anyElementEvent$$() {
    return this.elementsData.anyElementEvent$.asObservable();
  }
}
