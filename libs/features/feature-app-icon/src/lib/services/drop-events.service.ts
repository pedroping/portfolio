import { Injectable } from '@angular/core';
import { IDropEvent } from '@portifolio/utils/util-models';
import { Subject, filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DropEventsService {
  private dropEvent$ = new Subject<IDropEvent>();

  setDropEvent(event: IDropEvent) {
    this.dropEvent$.next(event);
  }

  get dropEvent$$() {
    return this.dropEvent$.asObservable();
  }

  getEspecificEvent(id: number | string) {
    return this.dropEvent$$.pipe(filter((event) => event.id === id));
  }
}
