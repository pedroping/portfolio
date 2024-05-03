import { Injectable, Injector, ViewContainerRef } from '@angular/core';
import { DomElementAdpter } from '@portifolio/util/util-adpters';
import { BehaviorSubject } from 'rxjs';
import { PageComponent } from '../../components/page/page.component';
import {
  IDomElementOptions,
  IElement,
  IInitialConfig,
  IPageConfig,
} from '../../models/elements-interfaces';
import { CONFIG_TOKEN, DATA_TOKEN } from '../../models/elements-token';
import { ElementsData } from '../elements-data/elements-data.service';
import { SetZIndexService } from '../set-z-index/set-z-index.service';
@Injectable({ providedIn: 'root' })
export class ElementCreatorService<T> {
  private vcr!: ViewContainerRef;

  constructor(
    private readonly injector: Injector,
    private readonly elementsData: ElementsData,
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

    const elementReference$ = new BehaviorSubject<IElement | null>(null);
    const pageConfig: IPageConfig = {
      ...config,
      elementReference$: elementReference$,
    };
    const id = this.elementsData.elements$.value.length;
    const elementInjection = this.createElementInjection(data, pageConfig);
    const { changeDetectorRef, instance } = this.vcr.createComponent(
      PageComponent,
      {
        index: id,
        injector: elementInjection,
      }
    );

    changeDetectorRef.detectChanges();

    const elementReference = this.createElementReference(
      id,
      instance.element,
      domElementOptions,
      config.customX,
      config.customY
    );
    elementReference$.next(elementReference);
    this.elementsData.pushElement(id, config.name, elementReference);

    DomElementAdpter.setZIndex(
      instance.element,
      this.setZIndexService.setNewZIndex(id)
    );
    DomElementAdpter.setDisplay(instance.element, !!domElementOptions?.opened);
    DomElementAdpter.setTransform(
      instance.element,
      config.customX || 0,
      config.customY || 0
    );
  }

  destroyElement(id: number) {
    const vcrIndex = this.elementsData.findElementIndex(id);
    this.vcr.remove(vcrIndex);
    this.elementsData.removeElement(id);
  }

  private createElementReference(
    id: number,
    element: HTMLElement,
    domElementOptions?: IDomElementOptions,
    customX = 0,
    customY = 0
  ): IElement {
    return {
      id: id,
      element: element,
      lastPosition: {
        x: customX,
        y: customY,
      },
      opened: !!domElementOptions?.opened,
      isFullScreen: domElementOptions?.isFullScreen || false,
      preventObservers$: new BehaviorSubject<boolean>(true),
    };
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
}
