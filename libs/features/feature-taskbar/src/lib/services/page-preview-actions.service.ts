import { Injectable } from '@angular/core';
import { Subject, filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PagePreviewActionsService {
  private closeOtherMenus$ = new Subject<string>();
  private closeAll$ = new Subject<void>();
  closeAll$$ = this.closeAll$.asObservable();

  setCloseOtherMenus(id: string) {
    this.closeOtherMenus$.next(id);
  }

  setCloseAll() {
    this.closeAll$.next();
  }

  getHasToClose(id: string) {
    return this.closeOtherMenus$
      .asObservable()
      .pipe(filter((eventId) => eventId != id));
  }
}
