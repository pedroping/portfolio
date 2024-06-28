import { DestroyRef, Directive, Inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ElementsFacade } from '@portifolio/utils/util-facades';
import { IPageConfig } from '@portifolio/utils/util-models';
import { fromEvent, merge, skip, take } from 'rxjs';
import { CONFIG_TOKEN } from '../../../../../../utils/util-models/src/lib/page-creator-models/elements-token';

@Directive({
  selector: '[windowResize]',
  standalone: true,
})
export class WindowResizeDirective implements OnInit {
  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly elementsFacade: ElementsFacade,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  ngOnInit(): void {
    merge(
      fromEvent(window, 'resize'),
      this._config.element$.pipe(take(2), skip(1))
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const element = this._config.element$.value;
        if (!element || this._config.isFullScreen || !this._config.opened)
          return;

        this.elementsFacade.setMaxPosition({ elmentConfig: this._config });
      });
  }
}
