import { Directive, ElementRef, Inject, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  fromEvent,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';
import { ElementsData } from '../../services/elements-data/elements-data.service';
import { ElementsFacede } from '../../facedes/elements-facades/elements-facede';

@Directive({
  selector: '.right',
  standalone: true,
})
export class PageResizeRightDirective implements OnInit {
  mouseDownEvent$: Observable<MouseEvent>;
  mouseMoveEvent$: Observable<MouseEvent>;
  mouseUpEvent$: Observable<MouseEvent>;
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

        const boundaryWidth =
          this.elementsData.draggingBoundaryElement$.value?.offsetWidth;
        if (boundaryWidth && event.y > boundaryWidth) return;

        const newPositionCalc = event.x - this.startPosition;
        const newWidth = Math.max(
          this.initialElementWidth + newPositionCalc,
          this._config.baseSizes.width
        );

        element.style.width = newWidth + 'px';
        this.elementsFacede.setAnyElementEvent(true);
      });

    this.mouseMoveEvent$
      .pipe(debounceTime(1000))
      .subscribe(() => this.elementsFacede.setAnyElementEvent(false));
  }
}
