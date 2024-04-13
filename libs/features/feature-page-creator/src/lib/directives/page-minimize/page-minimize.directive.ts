import { Directive, HostListener, Inject } from '@angular/core';
import { DomElementAdpter, UtlisFunctions } from '@portifolio/util/adpters';
import { IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';
import { ElementsData } from '../../services/elements-data/elements-data.service';

@Directive({
  selector: '[pageMinimize]',
  standalone: true,
})
export class PageMinimizeDirective {
  constructor(
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig,
    private readonly elementsData: ElementsData
  ) {}

  @HostListener('click') onclick() {
    const elementReference = this._config.elementReference.value;
    if (!elementReference) return;

    const element = elementReference.element.nativeElement;
    elementReference.lastPosition = DomElementAdpter.getTransformValues(
      element.style.transform
    );
    const index = this.elementsData.findIndexElement(elementReference.id);
    elementReference.opened = false;

    DomElementAdpter.setOnlyTransformTransition(element, 5);
    DomElementAdpter.setTransform(
      element,
      (index + 1) * 20,
      window.innerHeight * 2.5
    );

    UtlisFunctions.timerSubscription(100).subscribe(() => {
      DomElementAdpter.removeTransition(element);
      element.style.display = 'none';
    });
  }
}

// get higgestElementId() {
//   const elements = this.elementsData.elements$.value;

//   const idsAndZIndez = elements
//     .filter((item) => !!item.opened)
//     .map((item) => ({
//       id: item.id,
//       zIndez: +item.element.nativeElement.style.zIndex || 0,
//     }));

//   const maxZindex = Math.max(...idsAndZIndez.map((item) => item.zIndez));

//   const element = idsAndZIndez.find((item) => item.zIndez == maxZindex);

//   return element ? element.id : -1;
// }

// const { x, y } = DomElementAdpter.getTransformValues(
//   element.style.transform
// );
// const isHiggerElement = elementReference.id == this.higgestElementId;

// const isOnlyElement = elements
//   .filter((item) => item != elementReference)
//   .filter((item) => !!item.opened);

// const isBehindAnotherElement = elements
//   .filter((item) => +item.id != +element.id)
//   .filter((item) => !!item.opened)
//   .map(
//     (item) =>
//       DomElementAdpter.elementAboveOther(
//         item.element.nativeElement,
//         element
//       ) &&
//       DomElementAdpter.validateFullScreen(
//         item.element.nativeElement,
//         element
//       )
//   )
//   .find((result) => !!result);
