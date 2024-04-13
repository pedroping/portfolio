import { Directive, HostListener, Inject } from '@angular/core';
import { DomElementAdpter, UtlisFunctions } from '@portifolio/util/adpters';
import { IElement, IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';
import { ElementsData } from '../../services/elements-data/elements-data.service';

@Directive({
  selector: '[pageMaximize]',
  standalone: true,
})
export class PageMaximizeDirective {
  currentWidth: string | number = 'auto';
  currentHeight: string | number = 'auto';
  lastTranslet3d = DomElementAdpter.getTranslate3d(0, 0);

  constructor(
    private readonly elementsData: ElementsData,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  @HostListener('click') onclick() {
    const elementReference = this._config.elementReference$.value;
    if (!elementReference) return;

    const isFullScreen = elementReference.isFullScreen;

    if (!isFullScreen) this.setSizes(elementReference);

    const boundaryElement =
      this.elementsData.draggingBoundaryElement.parentElement;
    const element = elementReference.element.nativeElement;

    if (!boundaryElement || !element) return;

    const transform = isFullScreen
      ? this.lastTranslet3d
      : DomElementAdpter.getTranslate3d(0, 0);
    const width = isFullScreen
      ? this.currentWidth
      : boundaryElement.offsetWidth;
    const height = isFullScreen
      ? this.currentHeight
      : boundaryElement.offsetHeight;

    this.setPropierties(element, width, height, transform, elementReference);
  }

  setPropierties(
    element: HTMLElement,
    width: number | string,
    height: number | string,
    transform: string,
    elementReference: IElement
  ) {
    DomElementAdpter.setTransition(element);
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
    elementReference.lastPosition = { x: 0, y: 0 };
  }
}
