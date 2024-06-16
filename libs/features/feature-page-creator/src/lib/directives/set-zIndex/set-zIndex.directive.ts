import { Directive, HostListener, Inject } from '@angular/core';
import { ElementsFacede } from '../../facedes/elements-facades/elements-facede';
import { IPageConfig } from '@portifolio/utils/util-models';
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
  @HostListener('touchstart')
  onEvent() {
    const element = this._config.element$.value;
    const id = this._config.id;

    if (!element) return;

    this.elementsFacede.setNewZIndex(id, element);
  }
}
