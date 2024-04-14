import { Directive, HostListener, Inject, OnInit } from '@angular/core';
import { DomElementAdpter, UtlisFunctions } from '@portifolio/util/adpters';
import { IElement, IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';
import { ElementsData } from '../../services/elements-data/elements-data.service';
import { take } from 'rxjs';

@Directive({
  selector: '[pageMaximize]',
  standalone: true,
})
export class PageMaximizeDirective implements OnInit {
  currentWidth: string | number = 'auto';
  currentHeight: string | number = 'auto';
  lastTranslet3d = DomElementAdpter.getTranslate3d(0, 0);

  constructor(
    private readonly elementsData: ElementsData,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  ngOnInit(): void {
    this._config.elementReference$
      .pipe(take(2))
      .subscribe((elementReference) => {
        if (!elementReference || !elementReference.isFullScreen) return;

        const boundaryElement = this.elementsData.draggingBoundaryElement;
        const element = elementReference.element.nativeElement;
        this.setSizes(elementReference);
        elementReference.isFullScreen = false;

        this.lastTranslet3d = DomElementAdpter.getTranslate3d(
          this._config.customX || 0,
          this._config.customY || 0
        );

        this.setFullScreen(
          false,
          boundaryElement,
          element,
          elementReference,
          true
        );
      });
  }

  @HostListener('click') onclick() {
    const elementReference = this._config.elementReference$.value;
    if (!elementReference) return;

    const isFullScreen = elementReference.isFullScreen;

    if (!isFullScreen) this.setSizes(elementReference);

    const boundaryElement = this.elementsData.draggingBoundaryElement;
    const element = elementReference.element.nativeElement;

    if (!boundaryElement || !element) return;

    this.setFullScreen(
      isFullScreen,
      boundaryElement,
      element,
      elementReference
    );
  }

  setFullScreen(
    hasToSet: boolean,
    boundaryElement: HTMLElement,
    element: HTMLElement,
    elementReference: IElement,
    preventAnimation = false
  ) {
    const transform = hasToSet
      ? this.lastTranslet3d
      : DomElementAdpter.getTranslate3d(0, 0);
    const width = hasToSet ? this.currentWidth : boundaryElement.offsetWidth;
    const height = hasToSet ? this.currentHeight : boundaryElement.offsetHeight;

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
    const element = elementReference.element.nativeElement;
    const baseSizes = this._config.baseSizes;
    this.currentWidth =
      DomElementAdpter.getNumberFromSize(element.style.width) ||
      baseSizes.width;
    this.currentHeight =
      DomElementAdpter.getNumberFromSize(element.style.height) ||
      baseSizes.height;
    this.lastTranslet3d = element.style.transform;
  }
}
