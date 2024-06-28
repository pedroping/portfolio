import { Directive, HostListener, Inject } from '@angular/core';
import { ElementsFacade } from '@portifolio/utils/util-facades';
import { IPageConfig } from '@portifolio/utils/util-models';
import { CONFIG_TOKEN } from '../../../../../../utils/util-models/src/lib/page-creator-models/elements-token';

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
