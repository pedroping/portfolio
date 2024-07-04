import { Directive, HostListener, input, output } from '@angular/core';
import { TAvalilableOptions } from '@portifolio/utils/util-models';
import { Subject } from 'rxjs';

@Directive({
  selector: '[option]',
  standalone: true,
})
export class OptionDirective {
  optionName = input.required<TAvalilableOptions>({ alias: 'option' });
  private onClick$ = new Subject<TAvalilableOptions>();

  @HostListener('click') onClickEvent() {
    this.onClick$.next(this.optionName());
  }

  get onClick$$() {
    return this.onClick$.asObservable();
  }
}
