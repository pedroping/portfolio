import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FoldersViewStateService {
  private menuState$ = new BehaviorSubject<boolean>(true);

  setState(val: boolean) {
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
