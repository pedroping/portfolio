import { Directive, HostListener, Inject } from '@angular/core';
import { DomElementAdpter } from '@portifolio/util/adpters';
import { IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';
import { LastZIndexService } from '../../services/last-z-index/last-z-index.service';

@Directive({
  selector: '[setZIndex]',
  standalone: true,
})
export class SetZIndexDirective {
  constructor(
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig,
    private readonly lastZIndexService: LastZIndexService
  ) {}

  @HostListener('click') 
  @HostListener('mousedown') 
  onEvent() {
    const elementReference = this._config.elementReference$.value;
    if (!elementReference) return;

    const element = elementReference.element.nativeElement;
    const id = elementReference.id;

    DomElementAdpter.setZIndex(
      element,
      this.lastZIndexService.createNewZIndex(id)
    );
  }
}
