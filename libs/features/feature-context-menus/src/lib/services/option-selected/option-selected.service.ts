import { Injectable } from '@angular/core';
import {
  IOptionEvent,
  TAvalilableOptions,
} from '@portifolio/utils/util-models';
import { Subject, filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OptionSelectedService<T> {
  private optionSelected$ = new Subject<IOptionEvent<T>>();

  setOptionSelected(
    option: TAvalilableOptions,
    parentId: string | number,
    data?: T,
  ) {
    this.optionSelected$.next({ option, data, parentId });
  }

  getEventByOption(option: TAvalilableOptions, parentId?: string | number) {
    return this.optionSelected$$.pipe(
      filter(
        (event) =>
          event.option === option && !!parentId && event.parentId == parentId,
      ),
    );
  }

  get optionSelected$$() {
    return this.optionSelected$.asObservable();
  }
}
