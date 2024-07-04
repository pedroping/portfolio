import { Directive, HostListener, input } from '@angular/core';
import { TAvalilableOptions } from '@portifolio/utils/util-models';
import { ContextMenuFacade } from '../../facade/context-menu-facade.service';

@Directive({
  selector: '.option',
  standalone: true,
})
export class OptionEventDirective {
  optionName = input<TAvalilableOptions>();

  constructor(private readonly contextMenuFacade: ContextMenuFacade) {}

  @HostListener('click') onClick() {
    const name = this.optionName();

    if (!name) return;

    this.contextMenuFacade.setOptionSelected(name);
  }
}
