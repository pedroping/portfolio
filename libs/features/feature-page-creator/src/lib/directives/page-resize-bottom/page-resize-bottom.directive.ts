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
import { ElementsFacede } from '../../facedes/elements-facades/elements-facede';
import { IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';
import { ElementsData } from '../../services/elements-data/elements-data.service';

@Directive({
  selector: '.bottom',
  standalone: true,
})
export class PageResizeBottomDirective implements OnInit {
  mouseDownEvent$: Observable<MouseEvent>;
  mouseMoveEvent$: Observable<MouseEvent>;
  mouseUpEvent$: Observable<MouseEvent>;
  element$: BehaviorSubject<HTMLElement | null>;
  startPosition = 0;
  initialElementHeight = 0;

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
          this.startPosition = event.y;
          this.initialElementHeight = this.element$.value?.offsetHeight ?? 0;
        }),
        switchMap(() =>
          this.mouseMoveEvent$.pipe(takeUntil(this.mouseUpEvent$))
        )
      )
      .subscribe((event) => {
        const element = this.element$.value;
        if (!element || event.buttons !== 1) return;

        const boundaryHeight =
          this.elementsData.draggingBoundaryElement$.value?.offsetHeight;
        if (boundaryHeight && event.y > boundaryHeight) return;

        const newPositionCalc = event.y - this.startPosition;
        const newHeight = Math.max(
          this.initialElementHeight + newPositionCalc,
          this._config.baseSizes.height
        );

        element.style.height = newHeight + 'px';
        this.elementsFacede.setAnyElementEvent(true);
      });

    this.mouseMoveEvent$
      .pipe(debounceTime(1000))
      .subscribe(() => this.elementsFacede.setAnyElementEvent(false));
  }
}
