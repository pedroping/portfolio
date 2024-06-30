import {
  DestroyRef,
  Directive,
  ElementRef,
  Inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ElementsFacade } from '../../facades/elements-facade/elements-facade';
import { IPageConfig } from '@portifolio/utils/util-models';
import {
  BehaviorSubject,
  Observable,
  fromEvent,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { BASE_HEIGHT, ELEMENT_PADDING } from '../../mocks/elements.mocks';
import { CONFIG_TOKEN } from '@portifolio/utils/util-models';;

@Directive({
  selector: '.bottom',
  standalone: true,
})
export class PageResizeBottomDirective implements OnInit {
  mouseDownEvent$: Observable<MouseEvent>;
  mouseMoveEvent$: Observable<MouseEvent>;
  mouseUpEvent$: Observable<MouseEvent>;
  touchStart$: Observable<TouchEvent>;
  touchMove$: Observable<TouchEvent>;
  touchEnd$: Observable<TouchEvent>;

  element$: BehaviorSubject<HTMLElement | null>;
  startPosition = 0;
  initialElementHeight = 0;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly destroyRef: DestroyRef,
    private readonly elementsFacade: ElementsFacade,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {
    this.mouseDownEvent$ = fromEvent<MouseEvent>(
      this.elementRef.nativeElement,
      'mousedown'
    );
    this.mouseMoveEvent$ = fromEvent<MouseEvent>(document, 'mousemove');
    this.mouseUpEvent$ = fromEvent<MouseEvent>(document, 'mouseup');
    this.element$ = this._config.element$;
    this.touchEnd$ = fromEvent<TouchEvent>(document, 'touchend');
    this.touchMove$ = fromEvent<TouchEvent>(document, 'touchmove').pipe(
      takeUntil(this.touchEnd$)
    );
    this.touchStart$ = fromEvent<TouchEvent>(
      this.elementRef.nativeElement,
      'touchstart'
    );
  }

  ngOnInit(): void {
    this.mouseDownEvent$
      .pipe(
        tap((event) => {
          this.startPosition = event.y;
          this.initialElementHeight = this.element$.value?.offsetHeight ?? 0;
          this.elementsFacade.setAnyElementEvent(true);
        }),
        switchMap(() =>
          this.mouseMoveEvent$.pipe(takeUntil(this.mouseUpEvent$))
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((event) => {
        const element = this.element$.value;
        if (!element || event.buttons !== 1) return;

        this.resizeElement(event.y, element);
      });

    this.touchStart$
      .pipe(
        tap((event) => {
          this.startPosition = event.touches[0].pageY;
          this.initialElementHeight = this.element$.value?.offsetHeight ?? 0;
          this.elementsFacade.setAnyElementEvent(true);
        }),
        switchMap(() => this.touchMove$.pipe(takeUntil(this.touchEnd$))),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((event) => {
        const element = this.element$.value;
        if (!element) return;
        this.resizeElement(event.touches[0].pageY, element);
      });
  }

  resizeElement(y: number, element: HTMLElement) {
    if (this._config.isFullScreen) return;

    const boundaryHeight =
      this.elementsFacade.draggingBoundaryElement$.value?.offsetHeight;

    if (boundaryHeight && y > boundaryHeight - ELEMENT_PADDING * 2) return;

    const newPositionCalc = y - this.startPosition;
    const newHeight = Math.max(
      this.initialElementHeight + newPositionCalc,
      Math.min(this._config.baseSizes.minHeight ?? BASE_HEIGHT, BASE_HEIGHT)
    );

    element.style.height = newHeight + 'px';
    this.elementsFacade.setAnyElementEvent(true);
  }
}
