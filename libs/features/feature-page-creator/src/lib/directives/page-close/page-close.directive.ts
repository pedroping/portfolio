import { Directive, HostListener, Inject } from '@angular/core';
import { ElementsFacede } from '../../facedes/elements-facades/elements-facede';
import { IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';

@Directive({
  selector: '[pageClose]',
  standalone: true,
})
export class PageCloseDirective<T> {
  constructor(
    private readonly elementsFacede: ElementsFacede<T>,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  @HostListener('click') onclick() {
    this._config.onDestroy$.next();
    this.elementsFacede.destroyElement(this._config.id);
  }
}
