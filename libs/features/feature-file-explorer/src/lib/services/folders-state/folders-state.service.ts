import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FoldersStateService {
  private menuState$ = new BehaviorSubject<Boolean>(false);

  constructor() {}

  setState(val: Boolean) {
    this.menuState$.next(val);
  }

  toggleState() {
    this.menuState$.next(!this.menuState);
  }

  get menuState$$() {
    return this.menuState$.asObservable();
  }

  get menuState() {
    return this.menuState$.value;
  }
}
