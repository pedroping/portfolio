import {
  DestroyRef,
  Directive,
  HostListener,
  Inject,
  OnInit,
} from '@angular/core';
import { DomElementAdpter } from '@portifolio/utils/util-adpters';
import { filter, switchMap, take, tap } from 'rxjs';
import { ElementsFacede } from '../../facedes/elements-facades/elements-facede';
import { IPageConfig } from "@portifolio/utils/util-models";
import { CONFIG_TOKEN } from '../../models/elements-token';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[pageMinimize]',
  standalone: true,
})
export class PageMinimizeDirective implements OnInit {
  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly elementsFacede: ElementsFacede,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  ngOnInit(): void {
    this._config.element$
      .pipe(
        take(2),
        filter(
          () =>
            !!this._config && !this._config.opened && !this._config.isFullScreen
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.onclick());
  }

  @HostListener('click') onclick() {
    const element = this._config.element$.value;

    if (!element) return;

    const isFullScreen = this._config.isFullScreen;
    const index = this.elementsFacede.findElementIndex(this._config.id);
    this._config.opened = false;
    this.elementsFacede.hideElement(this._config.id);

    DomElementAdpter.setOnlyTransformTransition(element, 5);
    DomElementAdpter.setTransform(
      element,
      (index + 1) * 20,
      window.innerHeight * 2.5
    );

    DomElementAdpter.afterTransitions(element)
      .pipe(
        tap(() => {
          DomElementAdpter.removeTransition(element);
          element.style.display = 'none';
        }),
        switchMap(() => DomElementAdpter.afterTransitions(element)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this._config.isFullScreen = isFullScreen;
      });
  }
}
