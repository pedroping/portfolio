import { EnvironmentInjector, Injectable, Injector } from '@angular/core';
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
    const pageConfig: IPageConfig = {
      ...config,
      id: -1,
      lastPosition: {
        x: config.customX ?? 0,
        y: config.customY ?? 0,
      },
      opened: !!config?.opened,
      isFullScreen: !!config?.isFullScreen,
      onDestroy$: new Subject<void>(),
      element$: new BehaviorSubject<HTMLElement | null>(null),
    };

    const elementInjection = this.createElementInjection(data, pageConfig);
    const { componentRef, index } =
      this.workspaceReferenceFacade.createComponent(
        PageComponent,
        elementInjection
      );

    componentRef.changeDetectorRef.detectChanges();
    pageConfig.id = index;

    this.elementsData.pushElement(pageConfig);
    DomElementAdpter.setDisplay(
      componentRef.instance.element,
      !!config?.opened
    );
    this.setCustomTransform(componentRef.instance.element, pageConfig);
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
    const vcrIndex = this.elementsData.findElementIndex(id);
    this.workspaceReferenceFacade.clear(vcrIndex);
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
    this.workspaceReferenceFacade.clear();
  }
}
