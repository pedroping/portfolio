import { Directive, HostListener, Inject } from '@angular/core';
import { ElementsFacade } from '@portifolio/utils/util-facades';
import { IPageConfig } from '@portifolio/utils/util-models';
import { CONFIG_TOKEN } from '../../../../../../utils/util-models/src/lib/page-creator-models/elements-token';

@Directive({
  selector: '[setZIndex]',
  standalone: true,
})
export class SetZIndexDirective {
  constructor(
    private readonly ElementsFacade: ElementsFacade,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  @HostListener('click')
  @HostListener('mousedown')
  @HostListener('touchstart')
  onEvent() {
    const element = this._config.element$.value;
    const id = this._config.id;

    if (!element) return;

    this.ElementsFacade.setNewZIndex(id, element);
  }
}
