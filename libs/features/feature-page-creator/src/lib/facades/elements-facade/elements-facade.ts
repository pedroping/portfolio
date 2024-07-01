import { Injectable, ViewContainerRef } from '@angular/core';
import { IInitialConfig, IPageConfig } from '@portifolio/utils/util-models';
import { ElementCreatorService } from '../../services/element-creator/element-creator.service';
import { ElementsData } from '../../services/elements-data/elements-data.service';
import { PageActionsService } from '../../services/page-actions/page-actions.service';
import { PageEvents } from '../../services/page-events/page-events.service';
import { PreventHandlerElements } from '../../services/prevent-handler-elements/prevent-handler-elements.service';
import { SetZIndexService } from '../../services/set-z-index/set-z-index.service';

@Injectable({ providedIn: 'root' })
export class ElementsFacade<T = unknown> {
  constructor(
    private readonly pageEvents: PageEvents,
    private readonly elementsData: ElementsData,
    private readonly setZIndexService: SetZIndexService,
    private readonly pageActionsService: PageActionsService,
    private readonly preventHandlerElements: PreventHandlerElements,
    private readonly elementCreatorService: ElementCreatorService<T>
  ) {}

  createElement(data: T, config: IInitialConfig) {
    return this.elementCreatorService.createElement(data, config);
  }

  destroyElement(id: number) {
    this.elementCreatorService.destroyElement(id);
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
    this.pageEvents.setAnyElementEvent(val);
  }

  setMaxPosition(params: {
    elmentConfig: IPageConfig;
    x?: number;
    y?: number;
  }) {
    this.pageActionsService.setMaxPosition(params);
  }

  clearAll() {
    this.elementCreatorService.clearData();
    this.elementsData.clearData();
    this.setZIndexService.clearData();
    this.pageEvents.clearEvents();
  }

  get elements$() {
    return this.elementsData.elements$;
  }

  get basicElements$() {
    return this.elementsData.basicElements$;
  }

  get anyElementEvent$$() {
    return this.pageEvents.anyElementEvent$$;
  }
}
