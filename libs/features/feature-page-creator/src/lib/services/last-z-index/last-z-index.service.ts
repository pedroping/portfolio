import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LastZIndexService {
  lastZIndex = 10;
  biggestElementId?: string | number;

  createNewZIndex(id: number | string) {
    this.biggestElementId = id;
    this.lastZIndex += 1;
    return this.lastZIndex.toString();
  }
}
