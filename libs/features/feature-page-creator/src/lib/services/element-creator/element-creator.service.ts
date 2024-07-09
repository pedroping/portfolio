import {
  EnvironmentInjector,
  Injectable,
  Injector,
  ViewRef,
} from '@angular/core';
import { DomElementAdpter } from '@portifolio/utils/util-adpters';
import {
  CONFIG_TOKEN,
  DATA_TOKEN,
  IInitialConfig,
  IPageConfig,
} from '@portifolio/utils/util-models';
import { WorkspaceReferenceFacade } from '@portifolio/utils/util-workspace-reference';
import { BehaviorSubject, Subject } from 'rxjs';
import { PageComponent } from '../../ui/page.component';
import { ElementsData } from '../elements-data/elements-data.service';
import { SetZIndexService } from '../set-z-index/set-z-index.service';
@Injectable({ providedIn: 'root' })
export class ElementCreatorService<T> {
  constructor(
    private readonly elementsData: ElementsData,
    private readonly injector: EnvironmentInjector,
    private readonly setZIndexService: SetZIndexService,
    private readonly workspaceReferenceFacade: WorkspaceReferenceFacade<PageComponent>
  ) {}

  createElement(data: T, config: IInitialConfig) {
    const index = this.elementsData.elements$.value.length;
    const pageConfig = this.getPageConfig(config, index);
    const elementInjection = this.createElementInjection(data, pageConfig);

    const { componentRef } = this.workspaceReferenceFacade.createComponent(
      PageComponent,
      elementInjection
    );

    componentRef.changeDetectorRef.detectChanges();

    this.elementsData.pushElement(pageConfig);
    DomElementAdpter.setDisplay(
      componentRef.instance.element,
      !!config?.opened
    );

    this.setCustomTransform(componentRef.instance.element, pageConfig);
    pageConfig.hostView$.next(componentRef.hostView);
    pageConfig.element$.next(componentRef.instance.element);
    this.setZIndexService.setNewZIndex(index, componentRef.instance.element);

    return pageConfig;
  }

  setCustomTransform(element: HTMLElement, config: IPageConfig) {
    const boundaryElement = this.workspaceReferenceFacade.element;

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
    const element = this.elementsData.findElement(id);

    if (!element?.hostView$.value) return;

    this.workspaceReferenceFacade.clear(element.hostView$.value);
    this.elementsData.removeElement(id);
  }

  clearData() {
    this.workspaceReferenceFacade.clear();
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

  private getPageConfig(config: IInitialConfig, index: number) {
    return {
      ...config,
      id: index,
      lastPosition: {
        x: config.customX ?? 0,
        y: config.customY ?? 0,
      },
      opened: !!config?.opened,
      isFullScreen: !!config?.isFullScreen,
      onDestroy$: new Subject<void>(),
      element$: new BehaviorSubject<HTMLElement | null>(null),
      hostView$: new BehaviorSubject<ViewRef | null>(null),
      onMinimize$: new Subject<void>(),
      onMaximaze$: new Subject<void>(),
    };
  }
}
