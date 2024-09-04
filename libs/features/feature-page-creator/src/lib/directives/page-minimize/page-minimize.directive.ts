import { AfterViewInit, Directive, HostListener, Inject } from '@angular/core';
import { CONFIG_TOKEN, IPageConfig } from '@portifolio/utils/util-models';
import { ElementsFacade } from '../../facades/elements-facade/elements-facade';
import { DomElementAdpter } from '../../adapters/dom-element-adpter';

@Directive({
  selector: '[pageMinimize]',
  standalone: true,
})
export class PageMinimizeDirective implements AfterViewInit {
  constructor(
    private readonly elementsFacade: ElementsFacade,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig,
  ) {}

  ngAfterViewInit(): void {
    if (!!this._config && (this._config.opened || this._config.isFullScreen))
      return;

    this.minimizeElement();
  }

  @HostListener('click') minimizeElement() {
    const element = this._config.element$.value;

    if (!element) return;

    const index = this.elementsFacade.findElementIndex(this._config.id);
    this.elementsFacade.hideElement(this._config.id);
    this._config.onMinimize$.next();

    DomElementAdpter.setOnlyTransformTransition(element, 5);
    DomElementAdpter.setTransform(
      element,
      (index + 1) * 20,
      window.innerHeight * 2.5,
    );
  }
}
