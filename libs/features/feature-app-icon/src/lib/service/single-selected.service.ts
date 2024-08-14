import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SingleSelectedService {
  private unSelectedAll$ = new Subject<void>();

  setUnSelectedAll() {
    this.unSelectedAll$.next();
  }

  get unSelectedAll$$() {
    return this.unSelectedAll$.asObservable();
  }
}
