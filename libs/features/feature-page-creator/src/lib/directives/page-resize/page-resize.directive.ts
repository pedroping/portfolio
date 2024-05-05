import { Directive, Inject, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ElementsFacede } from '../../facede/elements-facede';
import { OBSERVE_CONFIG } from '../../mocks/observerConfig-mocks';
import { IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';

@Directive({
  selector: '[pageResize]',
  standalone: true,
})
export class PageResizeDirective implements OnInit {
  lastHeight: number | string = '';
  lastWidth: number | string = '';

  constructor(
    private readonly elementsFacede: ElementsFacede,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  ngOnInit(): void {
    this._config.elementReference$
      .pipe(take(2))
      .subscribe((elementReference) => {
        const element = elementReference?.element;
        if (!element) return;

        this.lastWidth = element.offsetWidth;
        this.lastHeight = element.offsetHeight;

        new MutationObserver(() => {
          const preventObservers = elementReference.preventObservers$.value;

          if (preventObservers) return;

          const width = element.offsetWidth;
          const height = element.offsetHeight;

          const boundaryElement =
            this.elementsFacede.draggingBoundaryElement$.value;

          if (
            width == boundaryElement?.offsetWidth &&
            height == boundaryElement.offsetHeight
          )
            return;

          if (width != this.lastWidth || height != this.lastHeight) {
            if (elementReference.isFullScreen)
              elementReference.lastPosition = { x: 0, y: 0 };
            elementReference.isFullScreen = false;
          }
        }).observe(element, OBSERVE_CONFIG);
      });
  }
}
