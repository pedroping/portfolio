import {
  AfterViewInit,
  DestroyRef,
  Directive,
  Inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CONFIG_TOKEN, IPageConfig } from '@portifolio/utils/util-models';
import { fromEvent, merge } from 'rxjs';
import { ElementsFacade } from '../../facades/elements-facade/elements-facade';

@Directive({
  selector: '[windowResize]',
  standalone: true,
})
export class WindowResizeDirective implements OnInit, AfterViewInit {
  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly elementsFacade: ElementsFacade,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig,
  ) {}

  ngOnInit(): void {
    merge(fromEvent(window, 'resize'))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const element = this._config.element$.value;
        if (!element || this._config.isFullScreen || !this._config.opened)
          return;

        this.elementsFacade.setMaxPosition(this._config);
      });
  }

  ngAfterViewInit() {
    const element = this._config.element$.value;
    if (!element || this._config.isFullScreen || !this._config.opened) return;

    this.elementsFacade.setMaxPosition(this._config);
  }
}
