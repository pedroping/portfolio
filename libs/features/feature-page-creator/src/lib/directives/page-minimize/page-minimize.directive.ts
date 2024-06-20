import {
  DestroyRef,
  Directive,
  HostListener,
  Inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomElementAdpter } from '@portifolio/utils/util-adpters';
import { ElementsFacade } from '@portifolio/utils/util-facades';
import { IPageConfig } from '@portifolio/utils/util-models';
import { filter, take } from 'rxjs';
import { CONFIG_TOKEN } from '../../models/elements-token';

@Directive({
  selector: '[pageMinimize]',
  standalone: true,
})
export class PageMinimizeDirective implements OnInit {
  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly ElementsFacade: ElementsFacade,
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

    const index = this.ElementsFacade.findElementIndex(this._config.id);
    this._config.opened = false;
    this.ElementsFacade.hideElement(this._config.id);

    DomElementAdpter.setOnlyTransformTransition(element, 5);
    DomElementAdpter.setTransform(
      element,
      (index + 1) * 20,
      window.innerHeight * 2.5
    );
  }
}
