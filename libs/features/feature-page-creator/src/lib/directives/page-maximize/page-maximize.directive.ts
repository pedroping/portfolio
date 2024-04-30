import { Directive, HostListener, Inject, OnInit } from '@angular/core';
import {
  DomElementAdpter,
  UtlisFunctions,
} from '@portifolio/util/util-adpters';
import { take } from 'rxjs';
import { ElementsFacede } from '../../facede/elements-facede';
import { IElement, IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';

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
    const elementReference = this._config.elementReference$.value;
    if (!elementReference) return;

    const isFullScreen = elementReference.isFullScreen;

    if (!isFullScreen) this.setSizes(elementReference);

    const boundaryElement = this.draggingBoundaryElement;
    const element = elementReference.element;

    if (!boundaryElement || !element) return;

    this.setFullScreen(
      !isFullScreen,
      boundaryElement,
      element,
      elementReference
    );
  }

  ngOnInit(): void {
    this.lastHeight = this.draggingBoundaryElement.offsetHeight;
    const observeConfig = {
      attributes: true,
      childList: true,
      subtree: true,
    };
    const boundaryElement = this.draggingBoundaryElement;

    this._config.elementReference$
      .pipe(take(2))
      .subscribe((elementReference) => {
        if (!elementReference || !elementReference.isFullScreen) return;

        this.setSizes(elementReference);
        const element = elementReference.element;
        elementReference.opened = true;
        elementReference.isFullScreen = false;

        this.lastTranslet3d = DomElementAdpter.getTranslate3d(
          this._config.customX || 0,
          this._config.customY || 0
        );

        this.setFullScreen(
          true,
          boundaryElement,
          element,
          elementReference,
          true
        );
      });

    new MutationObserver(() => {
      if (this.lastHeight === boundaryElement.offsetHeight) return;

      this.lastHeight = boundaryElement.offsetHeight;
      const elementReference = this._config.elementReference$.value;

      if (!elementReference) return;

      const element = elementReference.element;

      this.setFullScreen(
        true,
        boundaryElement,
        element,
        elementReference,
        true
      );
    }).observe(this.draggingBoundaryElement, observeConfig);
  }

  setFullScreen(
    hasToSet: boolean,
    boundaryElement: HTMLElement,
    element: HTMLElement,
    elementReference: IElement,
    preventAnimation = false
  ) {
    if (
      this.currentWidth == boundaryElement.offsetWidth &&
      this.currentHeight == boundaryElement.offsetHeight &&
      hasToSet
    )
      return this.setBaseScreenSize(
        element,
        elementReference,
        preventAnimation
      );

    const transform = hasToSet
      ? DomElementAdpter.getTranslate3d(0, 0)
      : this.lastTranslet3d;
    const width = hasToSet ? boundaryElement.offsetWidth : this.currentWidth;
    const height = hasToSet ? boundaryElement.offsetHeight : this.currentHeight;

    this.setPropierties(
      element,
      width,
      height,
      transform,
      elementReference,
      preventAnimation
    );
  }

  setBaseScreenSize(
    element: HTMLElement,
    elementReference: IElement,
    preventAnimation = false
  ) {
    const width = this._config.baseSizes.width;
    const height = this._config.baseSizes.height;
    const transform = this.lastTranslet3d;

    this.setPropierties(
      element,
      width,
      height,
      transform,
      elementReference,
      preventAnimation
    );
  }

  setPropierties(
    element: HTMLElement,
    width: number | string,
    height: number | string,
    transform: string,
    elementReference: IElement,
    preventAnimation = false
  ) {
    if (!preventAnimation) DomElementAdpter.setTransition(element);

    UtlisFunctions.timerSubscription(100).subscribe(() => {
      element.style.width = width + 'px';
      element.style.height = height + 'px';
      element.style.transform = transform;
    });

    UtlisFunctions.timerSubscription(200).subscribe(() => {
      elementReference.isFullScreen = !elementReference.isFullScreen;
      DomElementAdpter.removeTransition(element);
    });
  }

  setSizes(elementReference: IElement) {
    const element = elementReference.element;
    const baseSizes = this._config.baseSizes;
    this.currentWidth = element.offsetWidth || baseSizes.width;
    this.currentHeight = element.offsetHeight || baseSizes.height;
    this.lastTranslet3d = element.style.transform;
  }

  get draggingBoundaryElement() {
    return this.elementsFacede.draggingBoundaryElement;
  }
}
