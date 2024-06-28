import {
  DestroyRef,
  Directive,
  ElementRef,
  HostListener,
  NgZone,
  Type,
  ViewContainerRef,
  input,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  debounceTime,
  filter,
  fromEvent,
  merge,
  startWith,
  take,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { IPositionProperties } from '../../models/context-menu-models';
import { ContextMenuStateService } from '../../services/context-menu-state/context-menu-state.service';

@Directive({
  selector: '[openSubContextMenu]',
  standalone: true,
})
export class OpenSubContextMenuDirective {
  menuComponent = input.required<Type<unknown>>({
    alias: 'openSubContextMenu',
  });

  constructor(
    private readonly ngZone: NgZone,
    private readonly vcr: ViewContainerRef,
    private readonly destroyRef: DestroyRef,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly contextMenuEvents: ContextMenuStateService
  ) {}

  @HostListener('mouseenter') onMouseEnter() {
    let preventShow = false;

    const mouseLeave$ = fromEvent(
      this.elementRef.nativeElement,
      'mouseleave'
    ).pipe(tap(() => (preventShow = true)));

    const click$ = fromEvent(this.elementRef.nativeElement, 'click');

    mouseLeave$
      .pipe(
        startWith(undefined),
        debounceTime(500),
        take(1),
        takeUntil(click$),
        filter(() => !preventShow)
      )
      .subscribe(() => this.openMenu());
  }

  @HostListener('click', ['$event']) clickEvent(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    this.openMenu();
  }

  openMenu() {
    this.vcr.clear();

    this.contextMenuEvents.setCleatAll();

    const rect = this.elementRef.nativeElement.getBoundingClientRect();

    const view = this.vcr.createComponent(this.menuComponent()).location
      .nativeElement as HTMLElement;

    view.style.top = rect.top + 'px';
    view.style.left = rect.left + rect.width + 'px';

    this.setElementPositions(view, rect.width, { x: rect.left, y: rect.top });
    this.createDestroyTimeOut(view);
  }

  setElementPositions(
    elementView: HTMLElement,
    elementWidth: number,
    elementPosition: IPositionProperties
  ) {
    const pageWidth = window.innerWidth;
    const viewWidth = elementView.offsetWidth;
    const maxBound = elementPosition.x + viewWidth;

    elementView.style.top = elementPosition.y + 'px';

    if (maxBound <= pageWidth) {
      elementView.style.left = elementPosition.x + elementWidth + 'px';
      return;
    }

    elementView.style.left = elementPosition.x - elementWidth + 'px';
  }

  createDestroyTimeOut(view: HTMLElement) {
    this.ngZone.runOutsideAngular(() => {
      merge(
        fromEvent<PointerEvent>(document, 'click').pipe(
          filter((event) => {
            const isOutTarget = this.isOutTarget(
              view,
              event.target as HTMLElement
            );
            return isOutTarget;
          })
        ),
        this.contextMenuEvents.clearAll$$.pipe(take(1)),
        timer(5000, 5000).pipe(filter(() => !this.hasHover(view)))
      )
        .pipe(take(1), takeUntilDestroyed(this.destroyRef))
        .subscribe(() =>
          this.ngZone.run(() => {
            this.vcr.clear();
          })
        );
    });
  }

  hasHover(view?: HTMLElement) {
    const onHoverElements = document.querySelectorAll(':hover');

    return Array.from(onHoverElements).some(
      (element) =>
        view?.contains(element) ||
        this.elementRef.nativeElement.contains(element)
    );
  }

  isOutTarget(view: HTMLElement, target: HTMLElement) {
    return !view.contains(target) && view != target;
  }
}
