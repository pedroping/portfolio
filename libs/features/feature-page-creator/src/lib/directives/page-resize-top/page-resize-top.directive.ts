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
import {
  BehaviorSubject,
  Observable,
  fromEvent,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { BASE_HEIGHT } from '../../mocks/elements.mocks';
import { CONFIG_TOKEN } from '../../../../../../utils/util-models/src/lib/page-creator-models/elements-token';

@Directive({
  selector: '.top',
  standalone: true,
})
export class PageResizeTopDirective implements OnInit {
  mouseDownEvent$: Observable<MouseEvent>;
  mouseMoveEvent$: Observable<MouseEvent>;
  mouseUpEvent$: Observable<MouseEvent>;
  touchStart$: Observable<TouchEvent>;
  touchMove$: Observable<TouchEvent>;
  touchEnd$: Observable<TouchEvent>;

  element$: BehaviorSubject<HTMLElement | null>;
  startPosition = 0;
  initialElementWidth = 0;
  initialYPosition = 0;

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly elementRef: ElementRef,
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
          this.initialYPosition = this._config.lastPosition.y;
          this.initialElementWidth = this.element$.value?.offsetHeight ?? 0;
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
          this.initialYPosition = this._config.lastPosition.y;
          this.initialElementWidth = this.element$.value?.offsetHeight ?? 0;
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

    const newPositionCalc = this.startPosition - y;

    if (y < 0) return;

    const newHeight = Math.max(
      this.initialElementWidth + newPositionCalc,
      Math.min(this._config.baseSizes.minHeight ?? BASE_HEIGHT, BASE_HEIGHT)
    );

    element.style.height = newHeight + 'px';

    const minHeight = this._config.baseSizes.minHeight ?? BASE_HEIGHT;

    if (newHeight <= minHeight) return;

    this._config.lastPosition.y = this.initialYPosition - newPositionCalc;
    DomElementAdpter.setTransform(
      element,
      Math.max(this._config.lastPosition.x, 0),
      Math.max(this._config.lastPosition.y, 0)
    );
    this.elementsFacade.setAnyElementEvent(true);
  }
}
