import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PageEvents {
  private changeZIndex$ = new Subject<void>();
  private anyElementEvent$ = new BehaviorSubject<boolean>(false);

  setChangeZIndex() {
    this.changeZIndex$.next();
  }

  setAnyElementEvent(val: boolean) {
    this.anyElementEvent$.next(val);
  }

  get anyElementEvent$$() {
    return this.anyElementEvent$.asObservable();
  }

  get changeZIndex$$() {
    return this.changeZIndex$.asObservable();
  }

  clearEvents() {
    this.setAnyElementEvent(false);
  }
}
