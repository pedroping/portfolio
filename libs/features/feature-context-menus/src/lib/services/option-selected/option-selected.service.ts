import { Injectable } from '@angular/core';
import {
  IOptionEvent,
  TAvalilableOptions,
} from '@portifolio/utils/util-models';
import { Subject, filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OptionSelectedService<T> {
  private optionSelected$ = new Subject<IOptionEvent<T>>();

  setOptionSelected(option: TAvalilableOptions, data?: T) {
    this.optionSelected$.next({ option, data });
  }

  getEventByOption(option: TAvalilableOptions) {
    return this.optionSelected$$.pipe(
      filter((event) => event.option === option)
    );
  }

  get optionSelected$$() {
    return this.optionSelected$.asObservable();
  }
}
