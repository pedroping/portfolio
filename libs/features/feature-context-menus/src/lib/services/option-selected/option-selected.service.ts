import { Injectable } from '@angular/core';
import {
  IOptionEvent,
  TAvalilableOptions,
} from '@portifolio/utils/util-models';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OptionSelectedService<T> {
  private optionSelected$ = new Subject<IOptionEvent<T>>();

  setOptionSelected(option: TAvalilableOptions, data?: T) {
    this.optionSelected$.next({ option, data });
  }

  get optionSelected$$() {
    return this.optionSelected$.asObservable();
  }
}
