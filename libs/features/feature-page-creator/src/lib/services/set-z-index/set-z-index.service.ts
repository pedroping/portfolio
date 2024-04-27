import { Injectable } from '@angular/core';
import { LastZIndexService } from '@portifolio/util/util-z-index-handler';
@Injectable({ providedIn: 'root' })
export class SetZIndexService {
  private biggestElementId?: string | number;

  constructor(private readonly lastZIndexService: LastZIndexService) {}

  setNewZIndex(id: string | number) {
    this.biggestElementId = id;
    return this.lastZIndexService.createNewZIndex();
  }

  isBiggestElement(id: string | number) {
    return this.biggestElementId === id;
  }
}
