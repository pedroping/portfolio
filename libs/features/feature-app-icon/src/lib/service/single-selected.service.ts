import { Injectable } from '@angular/core';
import { AppCopyAndPasteFacade } from '@portifolio/utils/util-app-copy-and-paste';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SingleSelectedService {
  private unSelectedAll$ = new Subject<void>();

  constructor(private readonly appCopyAndPasteFacade: AppCopyAndPasteFacade) {}

  setUnSelectedAll() {
    this.unSelectedAll$.next();
    this.appCopyAndPasteFacade.setSelectedIcon();
  }

  get unSelectedAll$$() {
    return this.unSelectedAll$.asObservable();
  }
}
