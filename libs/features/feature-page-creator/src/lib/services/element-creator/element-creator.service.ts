import { Injectable, Injector, ViewContainerRef } from '@angular/core';
import { ElementsData } from '../elements-data/elements-data.service';
import { IInitialConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN, DATA_TOKEN } from '../../models/elements-token';
import { PageComponent } from '../../components/page/page.component';

@Injectable({ providedIn: 'root' })
export class ElementCreatorService<T> {
  vcr!: ViewContainerRef;

  constructor(
    private readonly elementsData: ElementsData,
    private readonly injector: Injector
  ) {}

  startCreator(vcr: ViewContainerRef) {
    this.vcr = vcr;
  }

  createElement(id: number, data: T, config: IInitialConfig) {
    if (!this.vcr)
      throw new Error(
        'ViewContainerRef not initialized try to use startCreator function '
      );

    const elementInjection = this.createElementInjection(data, config);
    const componentRef = this.vcr.createComponent(PageComponent, {
      index: id,
      injector: elementInjection,
    });
    console.log(componentRef);
  }

  private createElementInjection(data: T, config: IInitialConfig) {
    return Injector.create({
      providers: [
        { provide: DATA_TOKEN, useValue: data },
        { provide: CONFIG_TOKEN, useValue: config },
      ],
      parent: this.injector,
    });
  }
}
