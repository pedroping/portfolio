import { Directive, HostListener, Inject, OnInit } from '@angular/core';
import {
  DomElementAdpter,
  UtlisFunctions,
} from '@portifolio/utils/util-adpters';
import { filter, take } from 'rxjs';
import { ElementsFacede } from '../../facedes/elements-facades/elements-facede';
import { IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';

@Directive({
  selector: '[pageMinimize]',
  standalone: true,
})
export class PageMinimizeDirective implements OnInit {
  constructor(
    private readonly elementsFacede: ElementsFacede,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  ngOnInit(): void {
    this._config.elementReference.element$
      .pipe(
        take(2),
        filter(
          () =>
            !!this._config.elementReference &&
            !this._config.elementReference.opened &&
            !this._config.elementReference.isFullScreen
        )
      )
      .subscribe(() => this.onclick());
  }

  @HostListener('click') onclick() {
    const elementReference = this._config.elementReference;
    const element = elementReference.element$.value;

    if (!element) return;

    const isFullScreen = elementReference.isFullScreen;
    const index = this.elementsFacede.findElementIndex(elementReference.id);
    elementReference.opened = false;

    elementReference.preventObservers$.next(true);

    DomElementAdpter.setOnlyTransformTransition(element, 5);
    DomElementAdpter.setTransform(
      element,
      (index + 1) * 20,
      window.innerHeight * 2.5
    );

    UtlisFunctions.timerSubscription(100).subscribe(() => {
      DomElementAdpter.removeTransition(element);
      element.style.display = 'none';

      UtlisFunctions.timerSubscription(200).subscribe(() => {
        elementReference.isFullScreen = isFullScreen;
        elementReference.preventObservers$.next(false);
      });
    });
  }
}
