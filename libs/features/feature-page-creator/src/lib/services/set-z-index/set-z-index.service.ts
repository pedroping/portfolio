import { Injectable } from '@angular/core';
import { LastZIndexService } from '@portifolio/util/util-z-index-handler';
import { ElementsData } from '../elements-data/elements-data.service';
import { PageEvents } from '../page-events/page-events.service';
import { DomElementAdpter } from '@portifolio/util/util-adpters';
@Injectable({ providedIn: 'root' })
export class SetZIndexService {
  private biggestElementId?: string | number;

  constructor(
    private readonly pageEvents: PageEvents,
    private readonly elementsData: ElementsData,
    private readonly lastZIndexService: LastZIndexService
  ) {}

  setNewZIndex(id: string | number, element?: HTMLElement) {
    this.biggestElementId = id;
    const newZIndex = this.lastZIndexService.createNewZIndex();
    if (element) DomElementAdpter.setZIndex(element, newZIndex);
    this.pageEvents.setChangeZIndex();
    return newZIndex;
  }

  getHiggestElementId() {
    const indexAndIds = this.elementsData.elements$.value.map((element) => ({
      id: element.id,
      zIndex: element.element$.value?.style.zIndex || 0,
    }));

    const maxZindex = Math.max(...indexAndIds.map((item) => +item.zIndex));

    const element = indexAndIds.find((item) => item.zIndex == maxZindex);

    return element?.id;
  }

  isBiggestElement(id: string | number) {
    return this.biggestElementId === id;
  }
}
