import { Injectable } from '@angular/core';
import { Subject, filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PagePreviewActionsService {
  private closeOtherMenus$ = new Subject<string>();
  private closeAll$ = new Subject<void>();

  setCloseOtherMenus(id: string) {
    this.closeOtherMenus$.next(id);
  }

  setCloseAll() {
    this.closeAll$.next();
  }

  get closeAll$$() {
    return this.closeAll$.asObservable();
  }

  getHasToClose(id: string) {
    return this.closeOtherMenus$
      .asObservable()
      .pipe(filter((eventId) => eventId != id));
  }
}
