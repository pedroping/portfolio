import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContextMenuStateService {
  private clearAll$ = new Subject<void>();
  private clearDefault$ = new Subject<void>();

  setCleatAll() {
    this.clearAll$.next();
  }

  setClearDefault() {
    this.clearDefault$.next();
  }

  get clearDefault$$() {
    return this.clearDefault$.asObservable();
  }

  get clearAll$$() {
    return this.clearAll$.asObservable();
  }
}
