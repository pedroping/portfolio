import { DestroyRef, Directive, Inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomElementAdpter } from '@portifolio/utils/util-adpters';
import { IPageConfig } from '@portifolio/utils/util-models';
import { fromEvent, merge, skip, take } from 'rxjs';
import { ElementsFacade } from '@portifolio/utils/util-facades';
import { CONFIG_TOKEN } from '../../models/elements-token';

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
        const boundaryElement =
          this.elementsFacade.draggingBoundaryElement$.value;

        if (!element || !boundaryElement || this._config.isFullScreen) return;

        const height = element.offsetHeight;
        const boundaryHeight = boundaryElement.offsetHeight;
        const width = element.offsetWidth;
        const boundaryWidth = boundaryElement.offsetWidth;

        if (this._config.baseSizes.minHeight)
          this._config.baseSizes.minHeight = Math.min(
            this._config.baseSizes.minHeight,
            boundaryHeight
          );

        if (this._config.baseSizes.minWidth)
          this._config.baseSizes.minWidth = Math.min(
            this._config.baseSizes.minWidth,
            boundaryWidth
          );

        element.style.height = Math.min(height, boundaryHeight) + 'px';
        element.style.width = Math.min(width, boundaryWidth) + 'px';
        element.style.minWidth = this._config.baseSizes.minWidth + 'px';
        element.style.minHeight = this._config.baseSizes.minHeight + 'px';

        const maxBoundX = boundaryWidth - element.offsetWidth;
        const maxBoundY = boundaryHeight - element.offsetHeight;

        this._config.lastPosition.x = Math.min(
          this._config.lastPosition.x,
          maxBoundX
        );
        this._config.lastPosition.y = Math.min(
          this._config.lastPosition.y,
          maxBoundY
        );

        DomElementAdpter.setTransform(
          element,
          this._config.lastPosition.x,
          this._config.lastPosition.y
        );
      });
  }
}
