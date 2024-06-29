import { Directive, HostListener, Inject } from '@angular/core';
import { CONFIG_TOKEN, IPageConfig } from '@portifolio/utils/util-models';
import { ElementsFacade } from '../../facades/elements-facade/elements-facade';
@Directive({
  selector: '[pageClose]',
  standalone: true,
})
export class PageCloseDirective<T> {
  constructor(
    private readonly ElementsFacade: ElementsFacade<T>,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  @HostListener('click') onclick() {
    this._config.onDestroy$.next();
    this.ElementsFacade.destroyElement(this._config.id);
  }
}
