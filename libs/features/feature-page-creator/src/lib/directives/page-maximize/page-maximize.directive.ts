import {
  DestroyRef,
  Directive,
  HostListener,
  Inject,
  OnInit,
} from '@angular/core';
import { DomElementAdpter } from '@portifolio/utils/util-adpters';
import { filter, fromEvent, take } from 'rxjs';
import { ElementsFacede } from '../../facedes/elements-facades/elements-facede';
import { OBSERVE_CONFIG } from '../../mocks/observerConfig-mocks';
import { IPageConfig } from "@portifolio/utils/util-models";
import { CONFIG_TOKEN } from '../../models/elements-token';
import { ELEMENT_PADDING } from '../../mocks/elements.mocks';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[pageMaximize]',
  standalone: true,
})
export class PageMaximizeDirective implements OnInit {
  lastHeight = 0;
  currentWidth: string | number = 'auto';
  currentHeight: string | number = 'auto';
  lastTranslet3d = DomElementAdpter.getTranslate3d(0, 0);

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly elementsFacede: ElementsFacede,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  @HostListener('click') onclick() {
    const element = this._config.element$.value;

    if (!element) return;

    const isFullScreen = this._config.isFullScreen;

    if (!isFullScreen) this.setSizes();

    if (!element) return;

    this.setFullScreen(!isFullScreen, element);
    this._config.isFullScreen = !this._config.isFullScreen;
  }

  ngOnInit(): void {
    const boundaryElement = this.elementsFacede.draggingBoundaryElement$.value;
    if (!boundaryElement) return;
    this.lastHeight = boundaryElement.offsetHeight;

    this._config.element$
      .pipe(take(2), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (!this._config || !this._config.isFullScreen) return;
        const element = this._config.element$.value;

        if (!element) return;

        this.setSizes();
        this._config.opened = true;

        this.lastTranslet3d = DomElementAdpter.getTranslate3d(
          this._config.customX || 0,
          this._config.customY || 0
        );

        this.setFullScreen(true, element);
      });

    this.createBoundaryObservers();
  }

  createBoundaryObservers() {
    this.elementsFacede.draggingBoundaryElement$
      .pipe(filter(Boolean), takeUntilDestroyed(this.destroyRef))
      .subscribe((boundaryElement) => {
        new MutationObserver(() => {
          if (this.lastHeight === boundaryElement.offsetHeight) return;

          this.lastHeight = boundaryElement.offsetHeight;
          const element = this._config.element$.value;

          if (!element) return;

          if (
            !this._config ||
            !this._config.isFullScreen ||
            !this._config.opened
          )
            return;

          this.setFullScreen(true, element);
        }).observe(boundaryElement, OBSERVE_CONFIG);

        fromEvent(window, 'resize')
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => {
            const element = this._config.element$.value;

            if (!this._config.isFullScreen || !this._config.opened || !element)
              return;

            this.setFullScreen(true, element);
          });
      });
  }

  setFullScreen(hasToSet: boolean, element: HTMLElement) {
    const boundaryElement = this.elementsFacede.draggingBoundaryElement$.value;
    if (!boundaryElement) return;

    if (
      this.currentWidth == boundaryElement.offsetWidth + ELEMENT_PADDING * 2 &&
      this.currentHeight ==
        boundaryElement.offsetHeight + ELEMENT_PADDING * 2 &&
      hasToSet
    )
      return this.setBaseScreenSize(element);

    const transform = hasToSet
      ? DomElementAdpter.getTranslate3d(-ELEMENT_PADDING, -ELEMENT_PADDING)
      : this.lastTranslet3d;
    const width = hasToSet
      ? boundaryElement.offsetWidth + ELEMENT_PADDING * 2
      : this.currentWidth;
    const height = hasToSet
      ? boundaryElement.offsetHeight + ELEMENT_PADDING * 2
      : this.currentHeight;

    element.classList[hasToSet ? 'add' : 'remove']('onFullSrcreen');

    this.setPropierties(element, width, height, transform);
  }

  setBaseScreenSize(element: HTMLElement) {
    const width = this._config.baseSizes.width;
    const height = this._config.baseSizes.height;
    const transform = this.lastTranslet3d;

    this.setPropierties(element, width, height, transform);
  }

  setPropierties(
    element: HTMLElement,
    width: number | string,
    height: number | string,
    transform: string
  ) {
    DomElementAdpter.setTransition(element);

    element.style.width = width + 'px';
    element.style.height = height + 'px';
    element.style.transform = transform;
    element.style.display = 'block';

    DomElementAdpter.afterTransitions(element).subscribe(() => {
      DomElementAdpter.removeTransition(element);
    });
  }

  setSizes() {
    const element = this._config.element$.value;
    if (!element) return;

    const baseSizes = this._config.baseSizes;
    this.currentWidth =
      element.offsetWidth + ELEMENT_PADDING * 2 || baseSizes.width;
    this.currentHeight =
      element.offsetHeight + ELEMENT_PADDING * 2 || baseSizes.height;
    this.lastTranslet3d = element.style.transform;
  }
}
