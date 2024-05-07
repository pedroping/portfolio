import { Directive, HostListener, Inject, OnInit } from '@angular/core';
import {
  DomElementAdpter,
  UtlisFunctions,
} from '@portifolio/util/util-adpters';
import { take, tap } from 'rxjs';
import { ElementsFacede } from '../../facedes/elements-facades/elements-facede';
import { OBSERVE_CONFIG } from '../../mocks/observerConfig-mocks';
import { IElement, IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';

@Directive({
  selector: '[pageMaximize]',
  standalone: true,
})
export class PageMaximizeDirective implements OnInit {
  lastHeight = 0;
  boundaryElement!: HTMLElement;
  currentWidth: string | number = 'auto';
  currentHeight: string | number = 'auto';
  lastTranslet3d = DomElementAdpter.getTranslate3d(0, 0);

  constructor(
    private readonly elementsFacede: ElementsFacede,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  @HostListener('click') onclick() {
    const elementReference = this._config.elementReference;
    const element = elementReference.element$.value;

    if (!element) return;

    const isFullScreen = elementReference.isFullScreen;

    if (!isFullScreen) this.setSizes();

    if (!this.boundaryElement || !element) return;

    this.setFullScreen(!isFullScreen, element);
    elementReference.isFullScreen = !elementReference.isFullScreen;
  }

  ngOnInit(): void {
    if (!this.elementsFacede.draggingBoundaryElement$.value) return;
    const elementReference = this._config.elementReference;
    const element = elementReference.element$.value;

    if (!element) return;

    this.boundaryElement = this.elementsFacede.draggingBoundaryElement$.value;
    this.lastHeight = this.boundaryElement.offsetHeight;

    this._config.elementReference.element$.pipe(take(2)).subscribe(() => {
      if (!elementReference || !elementReference.isFullScreen) return;

      this.setSizes();
      elementReference.opened = true;

      this.lastTranslet3d = DomElementAdpter.getTranslate3d(
        this._config.customX || 0,
        this._config.customY || 0
      );

      this.setFullScreen(true, element, true);
    });

    this.createBoundaryObservers();
  }

  createBoundaryObservers() {
    new MutationObserver(() => {
      if (this.lastHeight === this.boundaryElement.offsetHeight) return;

      this.lastHeight = this.boundaryElement.offsetHeight;
      const elementReference = this._config.elementReference;
      const element = elementReference.element$.value;

      if (!element) return;

      if (!elementReference || !elementReference.isFullScreen) return;

      this.setFullScreen(true, element, true);
    }).observe(this.boundaryElement, OBSERVE_CONFIG);

    window.addEventListener('resize', () => {
      const elementReference = this._config.elementReference;
      const element = elementReference.element$.value;

      if (!elementReference.isFullScreen) return;
      if (!element) return;

      this.setFullScreen(true, element, true);
    });
  }

  setFullScreen(
    hasToSet: boolean,
    element: HTMLElement,
    preventAnimation = false
  ) {
    if (
      this.currentWidth == this.boundaryElement.offsetWidth &&
      this.currentHeight == this.boundaryElement.offsetHeight &&
      hasToSet
    )
      return this.setBaseScreenSize(element, preventAnimation);

    const transform = hasToSet
      ? DomElementAdpter.getTranslate3d(0, 0)
      : this.lastTranslet3d;
    const width = hasToSet
      ? this.boundaryElement.offsetWidth
      : this.currentWidth;
    const height = hasToSet
      ? this.boundaryElement.offsetHeight
      : this.currentHeight;

    this.setPropierties(element, width, height, transform, preventAnimation);
  }

  setBaseScreenSize(element: HTMLElement, preventAnimation = false) {
    const width = this._config.baseSizes.width;
    const height = this._config.baseSizes.height;
    const transform = this.lastTranslet3d;

    this.setPropierties(element, width, height, transform, preventAnimation);
  }

  setPropierties(
    element: HTMLElement,
    width: number | string,
    height: number | string,
    transform: string,
    preventAnimation = false
  ) {
    const elementReference = this._config.elementReference;

    if (!preventAnimation) DomElementAdpter.setTransition(element);
    elementReference.preventObservers$.next(true);

    UtlisFunctions.timerSubscription(100).subscribe(() => {
      element.style.width = width + 'px';
      element.style.height = height + 'px';
      element.style.transform = transform;
      element.style.display = 'block';

      UtlisFunctions.timerSubscription(200).subscribe(() => {
        DomElementAdpter.removeTransition(element);
        elementReference.preventObservers$.next(false);
      });
    });
  }

  setSizes() {
    const elementReference = this._config.elementReference;
    const element = elementReference.element$.value;
    if (!element) return;

    const baseSizes = this._config.baseSizes;
    this.currentWidth = element.offsetWidth || baseSizes.width;
    this.currentHeight = element.offsetHeight || baseSizes.height;
    this.lastTranslet3d = element.style.transform;
  }
}
