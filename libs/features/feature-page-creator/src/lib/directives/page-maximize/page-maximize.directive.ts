import { Directive, HostListener, Inject, OnInit } from '@angular/core';
import { DomElementAdpter } from '@portifolio/utils/util-adpters';
import { filter, take } from 'rxjs';
import { ElementsFacede } from '../../facedes/elements-facades/elements-facede';
import { OBSERVE_CONFIG } from '../../mocks/observerConfig-mocks';
import { IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';
import { ELEMENT_PADDING } from '../../mocks/elements.mocks';

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
    private readonly elementsFacede: ElementsFacede,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  @HostListener('click') onclick() {
    const elementReference = this._config.elementReference;
    const element = elementReference.element$.value;

    if (!element) return;

    const isFullScreen = elementReference.isFullScreen;

    if (!isFullScreen) this.setSizes();

    if (!element) return;

    this.setFullScreen(!isFullScreen, element);
    elementReference.isFullScreen = !elementReference.isFullScreen;
  }

  ngOnInit(): void {
    const boundaryElement = this.elementsFacede.draggingBoundaryElement$.value;
    if (!boundaryElement) return;
    const elementReference = this._config.elementReference;
    this.lastHeight = boundaryElement.offsetHeight;

    this._config.elementReference.element$.pipe(take(2)).subscribe(() => {
      if (!elementReference || !elementReference.isFullScreen) return;
      const element = elementReference.element$.value;

      if (!element) return;

      this.setSizes();
      elementReference.opened = true;

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
      .pipe(filter(Boolean))
      .subscribe((boundaryElement) => {
        new MutationObserver(() => {
          if (this.lastHeight === boundaryElement.offsetHeight) return;

          this.lastHeight = boundaryElement.offsetHeight;
          const elementReference = this._config.elementReference;
          const element = elementReference.element$.value;

          if (!element) return;

          if (!elementReference || !elementReference.isFullScreen) return;

          this.setFullScreen(true, element);
        }).observe(boundaryElement, OBSERVE_CONFIG);

        window.addEventListener('resize', () => {
          const elementReference = this._config.elementReference;
          const element = elementReference.element$.value;

          if (!elementReference.isFullScreen) return;
          if (!element) return;

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
    const elementReference = this._config.elementReference;
    const element = elementReference.element$.value;
    if (!element) return;

    const baseSizes = this._config.baseSizes;
    this.currentWidth =
      element.offsetWidth + ELEMENT_PADDING * 2 || baseSizes.width;
    this.currentHeight =
      element.offsetHeight + ELEMENT_PADDING * 2 || baseSizes.height;
    this.lastTranslet3d = element.style.transform;
  }
}
