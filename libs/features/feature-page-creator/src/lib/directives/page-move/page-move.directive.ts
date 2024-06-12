import {
  DestroyRef,
  Directive,
  ElementRef,
  Inject,
  OnInit,
} from '@angular/core';
import { DomElementAdpter } from '@portifolio/utils/util-adpters';
import { fromEvent, takeUntil } from 'rxjs';
import { ElementsFacede } from '../../facedes/elements-facades/elements-facede';
import {
  IElementReference,
  IPageConfig,
} from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';
import { ELEMENT_PADDING } from '../../mocks/elements.mocks';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    private readonly elementsFacede: ElementsFacede,
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

    const elementReference = this._config.elementReference;
    const element = elementReference.element$.value;

    if (!element) return;

    const draggingBoundaryElement =
      this.elementsFacede.draggingBoundaryElement$.value;

    if (!draggingBoundaryElement) return;

    const maxBoundX =
      draggingBoundaryElement.offsetWidth +
      ELEMENT_PADDING -
      element.offsetWidth;
    const maxBoundY =
      draggingBoundaryElement.offsetHeight +
      ELEMENT_PADDING -
      element.offsetHeight;

    this.initialX = event.clientX - elementReference.lastPosition.x || 0;
    this.initialY = event.clientY - elementReference.lastPosition.y || 0;

    this.drag$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      this.drag(
        event.clientX,
        event.clientY,
        element,
        maxBoundX,
        maxBoundY,
        elementReference
      );
    });
  }

  touchStart(event: TouchEvent) {
    if (this.hasPrevent(event.target as HTMLElement)) return;

    const elementReference = this._config.elementReference;
    const element = elementReference.element$.value;

    if (!element) return;

    const draggingBoundaryElement =
      this.elementsFacede.draggingBoundaryElement$.value;

    if (!draggingBoundaryElement) return;

    const touchX = event.touches[0].pageX;
    const touchY = event.touches[0].pageY;
    const maxBoundX =
      draggingBoundaryElement.offsetWidth -
      ELEMENT_PADDING -
      element.offsetWidth;
    const maxBoundY =
      draggingBoundaryElement.offsetHeight - element.offsetHeight;

    this.initialX = touchX - elementReference.lastPosition.x || 0;
    this.initialY = touchY - elementReference.lastPosition.y || 0;

    this.touchMove$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        const X = event.touches[0].pageX;
        const Y = event.touches[0].pageY;
        this.drag(X, Y, element, maxBoundX, maxBoundY, elementReference);
      });
  }

  drag(
    x: number,
    y: number,
    element: HTMLElement,
    maxBoundX: number,
    maxBoundY: number,
    elementReference: IElementReference
  ) {
    if (elementReference.isFullScreen) return;

    const newX = x - this.initialX;
    const newY = y - this.initialY;

    const maxPositionX = Math.min(newX, maxBoundX);
    const maxPositionY = Math.min(newY, maxBoundY);

    this.currentX = Math.max(-ELEMENT_PADDING, maxPositionX);
    this.currentY = Math.max(-ELEMENT_PADDING, maxPositionY);
    elementReference.lastPosition = { x: this.currentX, y: this.currentY };
    this.elementsFacede.setAnyElementEvent(true);
    DomElementAdpter.removeTransition(element);
    DomElementAdpter.setTransform(element, this.currentX, this.currentY);
  }

  hasPrevent(element: HTMLElement) {
    return this.elementsFacede.hasPreventElement(element);
  }
}
