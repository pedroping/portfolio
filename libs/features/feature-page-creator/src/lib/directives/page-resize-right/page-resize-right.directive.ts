import { Directive, ElementRef, Inject, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  fromEvent,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { ElementsFacede } from '../../facedes/elements-facades/elements-facede';
import { ELEMENT_PADDING } from '../../mocks/elements.mocks';
import { IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';
import { ElementsData } from '../../services/elements-data/elements-data.service';

@Directive({
  selector: '.right',
  standalone: true,
})
export class PageResizeRightDirective implements OnInit {
  mouseDownEvent$: Observable<MouseEvent>;
  mouseMoveEvent$: Observable<MouseEvent>;
  mouseUpEvent$: Observable<MouseEvent>;
  touchStart$: Observable<TouchEvent>;
  touchMove$: Observable<TouchEvent>;
  touchEnd$: Observable<TouchEvent>;

  element$: BehaviorSubject<HTMLElement | null>;
  startPosition = 0;
  initialElementWidth = 0;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly elementsData: ElementsData,
    private readonly elementsFacede: ElementsFacede,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {
    this.mouseDownEvent$ = fromEvent<MouseEvent>(
      this.elementRef.nativeElement,
      'mousedown'
    );
    this.mouseMoveEvent$ = fromEvent<MouseEvent>(document, 'mousemove');
    this.mouseUpEvent$ = fromEvent<MouseEvent>(document, 'mouseup');
    this.element$ = this._config.elementReference.element$;
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
          this.initialElementWidth = this.element$.value?.offsetWidth ?? 0;
        }),
        switchMap(() =>
          this.mouseMoveEvent$.pipe(takeUntil(this.mouseUpEvent$))
        )
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
          this.initialElementWidth = this.element$.value?.offsetWidth ?? 0;
        }),
        switchMap(() => this.touchMove$.pipe(takeUntil(this.touchEnd$)))
      )
      .subscribe((event) => {
        const element = this.element$.value;
        if (!element) return;

        this.resizeElement(event.touches[0].pageX, element);
      });
  }

  resizeElement(x: number, element: HTMLElement) {
    if (this._config.elementReference.isFullScreen) return;
    const boundaryWidth =
      this.elementsData.draggingBoundaryElement$.value?.offsetWidth;
    if (boundaryWidth && x > boundaryWidth - ELEMENT_PADDING) return;

    const newPositionCalc = x - this.startPosition;

    const newWidth = Math.max(
      this.initialElementWidth + newPositionCalc,
      this._config.baseSizes.width
    );

    element.style.width = newWidth + 'px';
    this.elementsFacede.setAnyElementEvent(true);
  }
}
