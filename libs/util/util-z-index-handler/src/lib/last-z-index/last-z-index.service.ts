import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LastZIndexService {
  lastZIndex = 10;

  createNewZIndex() {
    this.lastZIndex += 1;
    return this.lastZIndex.toString();
  }
}
