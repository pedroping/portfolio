import { Directive, ElementRef, Inject, OnInit } from '@angular/core';
import { DomElementAdpter } from '@portifolio/utils/util-adpters';
import {
  Observable,
  BehaviorSubject,
  fromEvent,
  tap,
  switchMap,
  takeUntil,
  debounceTime,
} from 'rxjs';
import { IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';

@Directive({
  selector: '.top',
  standalone: true,
})
export class PageResizeTopDirective implements OnInit {
  mouseDownEvent$: Observable<MouseEvent>;
  mouseMoveEvent$: Observable<MouseEvent>;
  mouseUpEvent$: Observable<MouseEvent>;
  element$: BehaviorSubject<HTMLElement | null>;
  startPosition = 0;
  initialElementWidth = 0;
  initialYPosition = 0;

  constructor(
    private readonly elementRef: ElementRef,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {
    this.mouseDownEvent$ = fromEvent<MouseEvent>(
      this.elementRef.nativeElement,
      'mousedown'
    );
    this.mouseMoveEvent$ = fromEvent<MouseEvent>(document, 'mousemove');
    this.mouseUpEvent$ = fromEvent<MouseEvent>(document, 'mouseup');
    this.element$ = this._config.elementReference.element$;
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
        if (event.y < 0) return;

        const elementReference = this._config.elementReference;
        const newPositionCalc = this.startPosition - event.y;

        const newWidth = Math.max(
          this.initialElementWidth + newPositionCalc,
          this._config.baseSizes.height
        );

        elementReference.lastPosition.y =
          this.initialYPosition - Math.max(newPositionCalc, 0);
        element.style.height = newWidth + 'px';
        DomElementAdpter.setTransform(
          element,
          elementReference.lastPosition.x,
          elementReference.lastPosition.y
        );
        this._config.elementReference.pageResizing$.next(true);
      });

    this.mouseMoveEvent$
      .pipe(debounceTime(1000))
      .subscribe(() => this._config.elementReference.pageResizing$.next(false));
  }
}
