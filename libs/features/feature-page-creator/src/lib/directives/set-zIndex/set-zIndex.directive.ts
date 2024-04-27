import { Directive, HostListener, Inject } from '@angular/core';
import { DomElementAdpter } from '@portifolio/util/adpters';
import { IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';
import { SetZIndexService } from '../../services/set-z-index/set-z-index.service';

@Directive({
  selector: '[setZIndex]',
  standalone: true,
})
export class SetZIndexDirective {
  constructor(
    private readonly setZIndexService: SetZIndexService,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  @HostListener('click')
  @HostListener('mousedown')
  onEvent() {
    const elementReference = this._config.elementReference$.value;
    if (!elementReference) return;

    const element = elementReference.element.nativeElement;
    const id = elementReference.id;

    DomElementAdpter.setZIndex(element, this.setZIndexService.setNewZIndex(id));
  }
}
