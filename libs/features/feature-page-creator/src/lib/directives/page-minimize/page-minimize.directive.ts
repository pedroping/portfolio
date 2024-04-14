import { Directive, HostListener, Inject, OnInit } from '@angular/core';
import { DomElementAdpter, UtlisFunctions } from '@portifolio/util/adpters';
import { IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';
import { ElementsData } from '../../services/elements-data/elements-data.service';
import { take } from 'rxjs';

@Directive({
  selector: '[pageMinimize]',
  standalone: true,
})
export class PageMinimizeDirective implements OnInit {
  constructor(
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig,
    private readonly elementsData: ElementsData
  ) {}

  ngOnInit(): void {
    this._config.elementReference$
      .pipe(take(2))
      .subscribe((elementReference) => {
        if (!elementReference || elementReference.opened || elementReference.isFullScreen) return;
        
        this.onclick();
      });
  }

  @HostListener('click') onclick() {
    const elementReference = this._config.elementReference$.value;
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
