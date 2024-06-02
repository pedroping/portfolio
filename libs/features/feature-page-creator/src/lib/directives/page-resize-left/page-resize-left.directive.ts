import { Directive, ElementRef, Inject, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  fromEvent,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';
import { DomElementAdpter } from '@portifolio/utils/util-adpters';

@Directive({
  selector: '.left',
  standalone: true,
})
export class PageResizeLeftDirective implements OnInit {
  mouseDownEvent$: Observable<MouseEvent>;
  mouseMoveEvent$: Observable<MouseEvent>;
  mouseUpEvent$: Observable<MouseEvent>;
  element$: BehaviorSubject<HTMLElement | null>;
  startPosition = 0;
  initialElementWidth = 0;
  initialXPosition = 0;

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
          this.startPosition = event.x;
          this.initialXPosition = this._config.elementReference.lastPosition.x;
          this.initialElementWidth = this.element$.value?.offsetWidth ?? 0;
        }),
        switchMap(() =>
          this.mouseMoveEvent$.pipe(takeUntil(this.mouseUpEvent$))
        )
      )
      .subscribe((event) => {
        const element = this.element$.value;
        if (!element) return;

        const elementReference = this._config.elementReference;
        const newPositionCalc = this.startPosition - event.x;

        if (event.x < 0) return;

        const newWidth = Math.max(
          this.initialElementWidth + newPositionCalc,
          this._config.baseSizes.width
        );

        elementReference.lastPosition.x =
          this.initialXPosition - Math.max(newPositionCalc, 0);
        element.style.width = newWidth + 'px';
        DomElementAdpter.setTransform(
          element,
          elementReference.lastPosition.x,
          elementReference.lastPosition.y
        );
      });
  }
}
