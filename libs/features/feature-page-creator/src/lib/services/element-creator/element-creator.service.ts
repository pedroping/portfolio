import {
  EnvironmentInjector,
  Injectable,
  Injector,
  ViewContainerRef,
} from '@angular/core';
import { DomElementAdpter } from '@portifolio/utils/util-adpters';
import { BehaviorSubject, Subject } from 'rxjs';
import { PageComponent } from '../../component/page.component';
import { ELEMENT_BASE_ICON } from '../../mocks/elements.mocks';
import { CONFIG_TOKEN, DATA_TOKEN } from '../../models/elements-token';
import { ElementsData } from '../elements-data/elements-data.service';
import { SetZIndexService } from '../set-z-index/set-z-index.service';
import {
  IInitialConfig,
  IDomElementOptions,
  IPageConfig,
} from '@portifolio/utils/util-models';
@Injectable({ providedIn: 'root' })
export class ElementCreatorService<T> {
  private vcr!: ViewContainerRef;

  constructor(
    private readonly elementsData: ElementsData,
    private readonly injector: EnvironmentInjector,
    private readonly setZIndexService: SetZIndexService
  ) {}

  startCreator(vcr: ViewContainerRef) {
    this.vcr = vcr;
  }

  createElement(
    data: T,
    config: IInitialConfig,
    domElementOptions?: IDomElementOptions
  ) {
    if (!this.vcr)
      throw new Error(
        'ViewContainerRef not initialized try to use startCreator function '
      );

    const id = this.elementsData.elements$.value.length;
    const pageConfig: IPageConfig = {
      ...config,
      id,
      lastPosition: {
        x: config.customX ?? 0,
        y: config.customY ?? 0,
      },
      opened: !!domElementOptions?.opened,
      isFullScreen: !!domElementOptions?.isFullScreen,
      onDestroy$: new Subject<void>(),
      element$: new BehaviorSubject<HTMLElement | null>(null),
    };

    const elementInjection = this.createElementInjection(data, pageConfig);
    const { changeDetectorRef, instance } = this.vcr.createComponent(
      PageComponent,
      {
        index: id,
        injector: elementInjection,
      }
    );

    changeDetectorRef.detectChanges();
    this.elementsData.pushElement(pageConfig);
    DomElementAdpter.setDisplay(instance.element, !!domElementOptions?.opened);
    this.setCustomTransform(instance.element, pageConfig);
    pageConfig.element$.next(instance.element);
    this.setZIndexService.setNewZIndex(id, instance.element);

    return pageConfig;
  }

  setCustomTransform(element: HTMLElement, config: IPageConfig) {
    const boundaryElement = this.elementsData.draggingBoundaryElement$.value;

    if (!boundaryElement)
      return DomElementAdpter.setTransform(
        element,
        config.customX || 0,
        config.customY || 0
      );

    const height = boundaryElement.offsetHeight;
    const width = boundaryElement.offsetWidth;
    const elementHeight = element.offsetHeight;
    const elementWidth = element.offsetWidth;

    const maxY = Math.min(config.customY || 0, height - elementHeight);
    const maxX = Math.min(config.customX || 0, width - elementWidth);

    config.lastPosition = { x: Math.max(0, maxX), y: Math.max(0, maxY) };
    DomElementAdpter.setTransform(element, maxX, maxY);
  }

  destroyElement(id: number) {
    const vcrIndex = this.elementsData.findElementIndex(id);
    this.vcr.remove(vcrIndex);
    this.elementsData.removeElement(id);
  }

  private createElementInjection(data: T, config: IPageConfig) {
    return Injector.create({
      providers: [
        { provide: DATA_TOKEN, useValue: data },
        { provide: CONFIG_TOKEN, useValue: config },
      ],
      parent: this.injector,
    });
  }

  clearData() {
    this.vcr.clear();
  }
}
