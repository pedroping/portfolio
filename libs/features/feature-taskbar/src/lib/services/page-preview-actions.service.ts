import { Injectable } from '@angular/core';
import { Subject, filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PagePreviewActionsService {
  private closeOtherMenus$ = new Subject<string>();

  setCloseOtherMenus(id: string) {
    this.closeOtherMenus$.next(id);
  }

  getHasToClose(id: string) {
    return this.closeOtherMenus$
      .asObservable()
      .pipe(filter((eventId) => eventId != id));
  }
}
