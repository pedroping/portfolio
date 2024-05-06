import { Directive, HostListener, Inject } from '@angular/core';
import { DomElementAdpter } from '@portifolio/util/util-adpters';
import { ElementsFacede } from '../../facedes/elements-facades/elements-facede';
import { IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';

@Directive({
  selector: '[setZIndex]',
  standalone: true,
})
export class SetZIndexDirective {
  constructor(
    private readonly elementsFacede: ElementsFacede,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  @HostListener('click')
  @HostListener('mousedown')
  onEvent() {
    const elementReference = this._config.elementReference$.value;
    if (!elementReference) return;

    const element = elementReference.element;
    const id = elementReference.id;

    this.elementsFacede.setNewZIndex(id, element);
  }
}
