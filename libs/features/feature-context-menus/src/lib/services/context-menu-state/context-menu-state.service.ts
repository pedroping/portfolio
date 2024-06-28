import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContextMenuStateService {
  private clearAll$ = new Subject<void>();

  setCleatAll() {
    this.clearAll$.next();
  }

  get clearAll$$() {
    return this.clearAll$.asObservable();
  }
}
