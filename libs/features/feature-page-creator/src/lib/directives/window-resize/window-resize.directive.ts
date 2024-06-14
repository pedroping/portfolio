import { DestroyRef, Directive, Inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomElementAdpter } from '@portifolio/utils/util-adpters';
import { fromEvent } from 'rxjs';
import { ElementsFacede } from '../../facedes/elements-facades/elements-facede';
import { IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';

@Directive({
  selector: '[windowResize]',
  standalone: true,
})
export class WindowResizeDirective implements OnInit {
  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly elementsFacade: ElementsFacede,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  ngOnInit(): void {
    fromEvent(window, 'resize')
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

        element.style.height = Math.min(height, boundaryHeight) + 'px';
        element.style.width = Math.min(width, boundaryWidth) + 'px';

        if (height > boundaryHeight || width > boundaryWidth) {
          this._config.lastPosition = { x: 0, y: 0 };
          DomElementAdpter.setTransform(element, 0, 0);
          console.log(height, boundaryHeight, width, boundaryWidth);
        }
      });
  }
}
