import { Directive, Inject, OnInit } from '@angular/core';
import { DomElementAdpter } from '@portifolio/utils/util-adpters';
import { Subject, debounceTime, filter, take } from 'rxjs';
import { ElementsFacede } from '../../facedes/elements-facades/elements-facede';
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
  stopResizing$ = new Subject<void>();

  constructor(
    private readonly elementsFacede: ElementsFacede,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  ngOnInit(): void {
    this._config.elementReference.element$.pipe(take(2)).subscribe(() => {
      const elementReference = this._config.elementReference;
      const element = this._config.elementReference.element$.value;
      if (!element) return;

      this.startPageResizing();
      this.stopPageResizing();

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
          elementReference.pageResizing$.next(true);
          DomElementAdpter.removeTransition(element);

          if (elementReference.isFullScreen)
            elementReference.lastPosition = { x: 0, y: 0 };
          elementReference.isFullScreen = false;

          this.lastWidth = element.offsetWidth;
          this.lastHeight = element.offsetHeight;
        }
      }).observe(element, OBSERVE_CONFIG);
    });
  }

  startPageResizing() {
    const elementReference = this._config.elementReference;
    if (!elementReference) return;

    elementReference.pageResizing$
      .pipe(debounceTime(200), filter(Boolean))
      .subscribe(() => {
        this.stopResizing$.next();
      });
  }

  stopPageResizing() {
    const elementReference = this._config.elementReference;
    if (!elementReference) return;

    this.stopResizing$.subscribe(() => {
      elementReference.pageResizing$.next(false);
    });
  }
}
