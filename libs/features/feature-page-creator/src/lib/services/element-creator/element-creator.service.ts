import {
  ElementRef,
  Injectable,
  Injector,
  ViewContainerRef,
} from '@angular/core';
import { ElementsData } from '../elements-data/elements-data.service';
import {
  IDomElementOptions,
  IElement,
  IElementActions,
  IInitialConfig,
  IPageConfig,
} from '../../models/elements-interfaces';
import { CONFIG_TOKEN, DATA_TOKEN } from '../../models/elements-token';
import { PageComponent } from '../../components/page/page.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { LastZIndexService } from '../last-z-index/last-z-index.service';
import { DomElementAdpter } from '@portifolio/util/adpters';
@Injectable({ providedIn: 'root' })
export class ElementCreatorService<T> {
  private vcr!: ViewContainerRef;

  constructor(
    private readonly injector: Injector,
    private readonly elementsData: ElementsData,
    private readonly lastZIndexService: LastZIndexService
  ) {}

  startCreator(vcr: ViewContainerRef) {
    this.vcr = vcr;
  }

  createElement(
    id: number,
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
      elementReference: elementReference$,
    };
    const elementInjection = this.createElementInjection(data, pageConfig);
    const componentRef = this.vcr.createComponent(PageComponent, {
      index: id,
      injector: elementInjection,
    });

    componentRef.changeDetectorRef.detectChanges();

    DomElementAdpter.setZIndex(
      componentRef.instance.element.nativeElement,
      this.lastZIndexService.createNewZIndex(id)
    );

    const elementReference = this.createElementReference(
      id,
      componentRef.instance.element,
      domElementOptions
    );

    this.elementsData.pushElement(elementReference);
    elementReference$.next(elementReference);
  }

  destroyElement(id: number) {
    this.elementsData.removeElement(id);
    this.vcr.remove(id);
  }

  private createElementReference(
    id: number,
    element: ElementRef<HTMLElement>,
    domElementOptions?: IDomElementOptions
  ): IElement {
    return {
      id: id,
      element: element,
      opened: domElementOptions?.opened || true,
      lastPosition: domElementOptions?.lastPosition || {
        x: 0,
        y: 0,
      },
      isFullScreen: domElementOptions?.isFullScreen || false,
      elementActions: this.createActions(),
    };
  }

  private createActions(): IElementActions {
    return {
      minimize$: new Subject<void>(),
      maximize$: new Subject<void>(),
      close$: new Subject<void>(),
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
