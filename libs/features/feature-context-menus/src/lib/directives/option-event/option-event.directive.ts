import { Directive, HostListener, input } from '@angular/core';
import { TAvalilableOptions } from '@portifolio/utils/util-models';

@Directive({
  selector: '.option',
  standalone: true,
})
export class OptionEventDirective {
  optionName = input<TAvalilableOptions>();
  constructor() {}

  @HostListener('click') onClick() {
    const name = this.optionName();

    if (!name) return;
  }
}
