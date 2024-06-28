import {
  DestroyRef,
  Directive,
  ElementRef,
  Inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomElementAdpter } from '@portifolio/utils/util-adpters';
import { ElementsFacade } from '@portifolio/utils/util-facades';
import { IPageConfig } from '@portifolio/utils/util-models';
import { fromEvent, takeUntil } from 'rxjs';
import { ELEMENT_PADDING } from '../../mocks/elements.mocks';
import { CONFIG_TOKEN } from '../../../../../../utils/util-models/src/lib/page-creator-models/elements-token';

@Directive({
  selector: '[pageMove]',
  standalone: true,
  host: {
    '[style.cursor]': '"grab"',
  },
})
export class PageMoveDirective implements OnInit {
  initialX = 0;
  initialY = 0;
  currentX = 0;
  currentY = 0;
  dragEnd$ = fromEvent<MouseEvent>(document, 'mouseup');
  dragStart$ = fromEvent<MouseEvent>(
    this.elementRef.nativeElement,
    'mousedown'
  );
  drag$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(
    takeUntil(this.dragEnd$)
  );

  touchEnd$ = fromEvent<TouchEvent>(document, 'touchend');
  touchMove$ = fromEvent<TouchEvent>(document, 'touchmove').pipe(
    takeUntil(this.touchEnd$)
  );
  touchStart$ = fromEvent<TouchEvent>(
    this.elementRef.nativeElement,
    'touchstart'
  );

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly elementRef: ElementRef,
    private readonly ElementsFacade: ElementsFacade,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  ngOnInit(): void {
    this.currentX = this._config.customX || 0;
    this.currentY = this._config.customY || 0;
    this.dragStart$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(this.dragStart.bind(this));
    this.touchStart$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(this.touchStart.bind(this));
  }

  dragStart(event: MouseEvent) {
    if (this.hasPrevent(event.target as HTMLElement)) return;

    const element = this._config.element$.value;

    if (!element) return;

    const draggingBoundaryElement =
      this.ElementsFacade.draggingBoundaryElement$.value;

    if (!draggingBoundaryElement) return;

    const maxBoundX =
      draggingBoundaryElement.offsetWidth +
      ELEMENT_PADDING -
      element.offsetWidth;
    const maxBoundY =
      draggingBoundaryElement.offsetHeight +
      ELEMENT_PADDING -
      element.offsetHeight;

    this.initialX = event.clientX - this._config.lastPosition.x || 0;
    this.initialY = event.clientY - this._config.lastPosition.y || 0;

    this.drag$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      this.drag({
        x: event.clientX,
        y: event.clientY,
        element,
        maxBoundX,
        maxBoundY,
      });
    });
  }

  touchStart(event: TouchEvent) {
    if (this.hasPrevent(event.target as HTMLElement)) return;

    const element = this._config.element$.value;

    if (!element) return;

    const draggingBoundaryElement =
      this.ElementsFacade.draggingBoundaryElement$.value;

    if (!draggingBoundaryElement) return;

    const touchX = event.touches[0].pageX;
    const touchY = event.touches[0].pageY;
    const maxBoundX =
      draggingBoundaryElement.offsetWidth -
      ELEMENT_PADDING -
      element.offsetWidth;
    const maxBoundY =
      draggingBoundaryElement.offsetHeight - element.offsetHeight;

    this.initialX = touchX - this._config.lastPosition.x || 0;
    this.initialY = touchY - this._config.lastPosition.y || 0;

    this.touchMove$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        const x = event.touches[0].pageX;
        const y = event.touches[0].pageY;
        this.drag({ x, y, element, maxBoundX, maxBoundY });
      });
  }

  drag(params: {
    x: number;
    y: number;
    element: HTMLElement;
    maxBoundX: number;
    maxBoundY: number;
  }) {
    if (this._config.isFullScreen) return;

    const newX = params.x - this.initialX;
    const newY = params.y - this.initialY;

    const maxPositionX = Math.min(newX, params.maxBoundX);
    const maxPositionY = Math.min(newY, params.maxBoundY);

    this.currentX = Math.max(0, Math.max(-ELEMENT_PADDING, maxPositionX));
    this.currentY = Math.max(0, Math.max(-ELEMENT_PADDING, maxPositionY));
    this._config.lastPosition = { x: this.currentX, y: this.currentY };
    this.ElementsFacade.setAnyElementEvent(true);
    DomElementAdpter.removeTransition(params.element);
    DomElementAdpter.setTransform(params.element, this.currentX, this.currentY);
  }

  hasPrevent(element: HTMLElement) {
    return this.ElementsFacade.hasPreventElement(element);
  }
}
