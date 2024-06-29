import {
  DestroyRef,
  Directive,
  ElementRef,
  Inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomElementAdpter } from '@portifolio/utils/util-adpters';
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
import { BASE_WIDTH } from '../../mocks/elements.mocks';
import { CONFIG_TOKEN } from '../../../../../../utils/util-models/src/lib/page-creator-models/elements-token';

@Directive({
  selector: '.left',
  standalone: true,
})
export class PageResizeLeftDirective implements OnInit {
  mouseDownEvent$: Observable<MouseEvent>;
  mouseMoveEvent$: Observable<MouseEvent>;
  mouseUpEvent$: Observable<MouseEvent>;
  touchStart$: Observable<TouchEvent>;
  touchMove$: Observable<TouchEvent>;
  touchEnd$: Observable<TouchEvent>;

  element$: BehaviorSubject<HTMLElement | null>;
  startPosition = 0;
  initialElementWidth = 0;
  initialXPosition = 0;

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
          this.startPosition = event.x;
          this.initialXPosition = this._config.lastPosition.x;
          this.initialElementWidth = this.element$.value?.offsetWidth ?? 0;
        }),
        switchMap(() =>
          this.mouseMoveEvent$.pipe(takeUntil(this.mouseUpEvent$))
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((event) => {
        const element = this.element$.value;
        if (!element || event.buttons !== 1) return;
        this.resizeElement(event.x, element);
      });

    this.touchStart$
      .pipe(
        tap((event) => {
          this.startPosition = event.touches[0].pageX;
          this.initialXPosition = this._config.lastPosition.x;
          this.initialElementWidth = this.element$.value?.offsetWidth ?? 0;
        }),
        switchMap(() => this.touchMove$.pipe(takeUntil(this.touchEnd$))),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((event) => {
        const element = this.element$.value;
        if (!element) return;

        this.resizeElement(event.touches[0].pageX, element);
      });
  }

  resizeElement(x: number, element: HTMLElement) {
    if (this._config.isFullScreen) return;
    const newPositionCalc = this.startPosition - x;

    if (x < 0) return;

    const newWidth = Math.max(
      this.initialElementWidth + newPositionCalc,
      Math.min(this._config.baseSizes.minWidth ?? BASE_WIDTH, BASE_WIDTH)
    );
    element.style.width = newWidth + 'px';

    this.elementsFacade.setAnyElementEvent(true);
    const minWidth = this._config.baseSizes.minWidth ?? BASE_WIDTH;

    if (newWidth <= minWidth) return;

    this._config.lastPosition.x = this.initialXPosition - newPositionCalc;
    DomElementAdpter.setTransform(
      element,
      Math.max(this._config.lastPosition.x, 0),
      Math.max(this._config.lastPosition.y, 0)
    );
  }
}
