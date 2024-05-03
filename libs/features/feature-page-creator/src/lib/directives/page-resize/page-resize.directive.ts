import { AfterViewInit, Directive, Inject, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ElementsFacede } from '../../facede/elements-facede';
import { IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';

@Directive({
  selector: '[pageResize]',
  standalone: true,
})
export class PageResizeDirective implements AfterViewInit {
  lastHeight: number | string = '';
  lastWidth: number | string = '';

  constructor(
    private readonly elementsFacede: ElementsFacede,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  ngAfterViewInit(): void {
    this._config.elementReference$
      .pipe(take(2))
      .subscribe((elementReference) => {
        const element = elementReference?.element;
        if (!element) return;

        this.lastWidth = element.offsetWidth;
        this.lastHeight = element.offsetHeight;

        const observeConfig = {
          attributes: true,
          childList: true,
          subtree: true,
        };
        new MutationObserver(() => {
          const width = element.offsetWidth;
          const height = element.offsetHeight;

          const boundaryElement =
            this.elementsFacede.draggingBoundaryElement$.value;

          if (
            width == boundaryElement?.offsetWidth &&
            height == boundaryElement.offsetHeight
          )
            return;

          if (width != this.lastWidth || height != this.lastHeight)
            elementReference.isFullScreen = false;
        }).observe(element, observeConfig);
      });
  }
}
