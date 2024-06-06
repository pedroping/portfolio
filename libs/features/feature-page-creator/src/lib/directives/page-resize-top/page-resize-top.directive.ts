import { Directive, ElementRef, Inject, OnInit } from '@angular/core';
import { DomElementAdpter } from '@portifolio/utils/util-adpters';
import {
  BehaviorSubject,
  Observable,
  fromEvent,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { ElementsFacede } from '../../facedes/elements-facades/elements-facede';
import { IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';
import { ELEMENT_PADDING } from '../../mocks/elements.mocks';

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
    private readonly elementRef: ElementRef,
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
          this.startPosition = event.y;
          this.initialYPosition = this._config.elementReference.lastPosition.y;
          this.initialElementWidth = this.element$.value?.offsetHeight ?? 0;
        }),
        switchMap(() =>
          this.mouseMoveEvent$.pipe(takeUntil(this.mouseUpEvent$))
        )
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
          this.initialYPosition = this._config.elementReference.lastPosition.y;
          this.initialElementWidth = this.element$.value?.offsetHeight ?? 0;
        }),
        switchMap(() => this.touchMove$.pipe(takeUntil(this.touchEnd$)))
      )
      .subscribe((event) => {
        const element = this.element$.value;
        if (!element) return;

        this.resizeElement(event.touches[0].pageY, element);
      });
  }

  resizeElement(y: number, element: HTMLElement) {
    if (this._config.elementReference.isFullScreen) return;

    const elementReference = this._config.elementReference;
    const newPositionCalc = this.startPosition - y;

    const newWidth = Math.max(
      this.initialElementWidth + newPositionCalc,
      this._config.baseSizes.height
    );

    elementReference.lastPosition.y =
      this.initialYPosition - Math.max(newPositionCalc, 0);
    element.style.height = newWidth + 'px';
    DomElementAdpter.setTransform(
      element,
      Math.max(elementReference.lastPosition.x, -ELEMENT_PADDING),
      Math.max(elementReference.lastPosition.y, -ELEMENT_PADDING)
    );
    this.elementsFacede.setAnyElementEvent(true);
  }
}
