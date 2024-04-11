import { Injectable, ViewContainerRef } from '@angular/core';
import { ElementCreatorService } from '../services/element-creator/element-creator.service';
import { ElementsData } from '../services/elements-data/elements-data.service';
import { IInitialConfig } from '../models/elements-interfaces';

@Injectable({ providedIn: 'root' })
export class ElementsFacede<T = any> {
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
}
