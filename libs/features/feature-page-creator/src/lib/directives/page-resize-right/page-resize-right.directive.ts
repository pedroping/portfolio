import {
  DestroyRef,
  Directive,
  ElementRef,
  Inject,
  OnInit,
} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  fromEvent,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { ElementsFacade } from '../../facades/elements-facade/elements-facade';
import { BASE_WIDTH, ELEMENT_PADDING } from '../../mocks/elements.mocks';
import { IPageConfig } from '@portifolio/utils/util-models';
import { CONFIG_TOKEN } from '@portifolio/utils/util-models';
import { ElementsData } from '../../services/elements-data/elements-data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WorkspaceReferenceFacade } from '@portifolio/utils/util-workspace-reference';

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
    private readonly destroyRef: DestroyRef,
    private readonly elementRef: ElementRef,
    private readonly elementsFacade: ElementsFacade,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig,
    private readonly workspaceReferenceFacade: WorkspaceReferenceFacade
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
    const boundaryWidth = this.workspaceReferenceFacade.element.offsetWidth;
    if (boundaryWidth && x > boundaryWidth - ELEMENT_PADDING * 2) return;

    const newPositionCalc = x - this.startPosition;

    const newWidth = Math.max(
      this.initialElementWidth + newPositionCalc,
      Math.min(this._config.baseSizes.minWidth ?? BASE_WIDTH, BASE_WIDTH)
    );

    element.style.width = newWidth + 'px';
    this.elementsFacade.setAnyElementEvent(true);
  }
}
