import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PageEvents {
  private changeZIndex$ = new Subject<void>();
  private anyElementEvent$ = new BehaviorSubject<boolean>(false);
  private createOverlay$ = new Subject<void>();

  setChangeZIndex() {
    this.changeZIndex$.next();
  }

  setAnyElementEvent(val: boolean) {
    this.anyElementEvent$.next(val);
  }

  setCreateOverlay() {
    this.createOverlay$.next();
  }

  get anyElementEvent$$() {
    return this.anyElementEvent$.asObservable();
  }

  get changeZIndex$$() {
    return this.changeZIndex$.asObservable();
  }

  get createOverlay$$() {
    return this.createOverlay$.asObservable();
  }

  clearEvents() {
    this.setAnyElementEvent(false);
  }
}
