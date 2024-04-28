import { Directive, HostListener, Inject, OnInit } from '@angular/core';
import { DomElementAdpter, UtlisFunctions } from '@portifolio/util/adpters';
import { take } from 'rxjs';
import { ElementsFacede } from '../../facede/elements-facede';
import { IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';

@Directive({
  selector: '[pageMinimize]',
  standalone: true,
})
export class PageMinimizeDirective implements OnInit {
  constructor(
    private readonly elementsFacede: ElementsFacede,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig,
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
    const index = this.elementsFacede.findIndexElement(elementReference.id);
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
