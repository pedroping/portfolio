import { Injectable } from '@angular/core';
import { TAvalilableOptions } from '@portifolio/utils/util-models';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OptionSelectedService {
  private optionSelected$ = new Subject<TAvalilableOptions>();

  constructor() {}

  setOptionSelected(option: TAvalilableOptions) {
    this.optionSelected$.next(option);
  }

  get optionSelected$$() {
    return this.optionSelected$.asObservable();
  }
}
