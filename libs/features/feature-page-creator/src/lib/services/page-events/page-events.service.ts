import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PageEvents {
  private pageCreated$ = new Subject<number>();
  private pageDestroyed$ = new Subject<number>();
  private changeZIndex$ = new Subject<void>();

  setChangeZIndex() {
    this.changeZIndex$.next();
  }

  get changeZIndex$$() {
    return this.changeZIndex$.asObservable();
  }
}
