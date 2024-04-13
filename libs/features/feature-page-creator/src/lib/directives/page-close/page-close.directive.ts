import { Directive, HostListener, Inject } from '@angular/core';
import { IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';
import { ElementCreatorService } from '../../services/element-creator/element-creator.service';

@Directive({
  selector: '[pageClose]',
  standalone: true,
})
export class PageCloseDirective<T> {
  constructor(
    private readonly elementCreatorService: ElementCreatorService<T>,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  @HostListener('click') onclick() {
    const elementReference = this._config.elementReference.value;
    if (!elementReference) return;
    this.elementCreatorService.destroyElement(elementReference.id);
  }
}
