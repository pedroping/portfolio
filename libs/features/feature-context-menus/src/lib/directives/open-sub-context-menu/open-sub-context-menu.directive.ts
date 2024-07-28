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
import { ContextMenuFacade } from '../../facade/context-menu-facade.service';
import {
  IContextMenu,
  IPositionProperties,
} from '../../models/context-menu-models';

@Directive({
  selector: '[openSubContextMenu]',
  standalone: true,
})
export class OpenSubContextMenuDirective<T> {
  menuComponent = input.required<Type<unknown>>({
    alias: 'openSubContextMenu',
  });
  id = input.required<T>();
  parentId = input.required<string | number>();

  constructor(
    private readonly ngZone: NgZone,
    private readonly vcr: ViewContainerRef,
    private readonly destroyRef: DestroyRef,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly contextMenuFacade: ContextMenuFacade<T>,
  ) {}

  @HostListener('mouseenter') onMouseEnter() {
    let preventShow = false;

    const mouseLeave$ = fromEvent(
      this.elementRef.nativeElement,
      'mouseleave',
    ).pipe(tap(() => (preventShow = true)));

    const click$ = fromEvent(this.elementRef.nativeElement, 'click');

    mouseLeave$
      .pipe(
        startWith(undefined),
        debounceTime(500),
        take(1),
        takeUntil(click$),
        filter(() => !preventShow),
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

    this.contextMenuFacade.setCleatAll();

    const rect = this.elementRef.nativeElement.getBoundingClientRect();

    const { location, instance } = this.vcr.createComponent(
      this.menuComponent(),
    );

    const view = location.nativeElement as HTMLElement;

    (instance as IContextMenu<T>).data = this.id();
    (instance as IContextMenu<T>).parentId = this.parentId();

    view.style.top = rect.top + 'px';
    view.style.left = rect.left + rect.width + 'px';

    this.setElementPositions(view, rect.width, { x: rect.left, y: rect.top });
    this.createDestroyTimeOut(view);
  }

  setElementPositions(
    elementView: HTMLElement,
    elementWidth: number,
    elementPosition: IPositionProperties,
  ) {
    const pageWidth = window.innerWidth;
    const viewWidth = elementView.offsetWidth;
    const maxBound = elementPosition.x + elementWidth + viewWidth;

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
              event.target as HTMLElement,
            );
            return isOutTarget;
          }),
        ),
        this.contextMenuFacade.clearAll$$.pipe(take(1)),
        timer(5000, 5000).pipe(filter(() => !this.hasHover(view))),
      )
        .pipe(take(1), takeUntilDestroyed(this.destroyRef))
        .subscribe(() =>
          this.ngZone.run(() => {
            this.vcr.clear();
          }),
        );
    });
  }

  hasHover(view?: HTMLElement) {
    const onHoverElements = document.querySelectorAll(':hover');

    return Array.from(onHoverElements).some(
      (element) =>
        view?.contains(element) ||
        this.elementRef.nativeElement.contains(element),
    );
  }

  isOutTarget(view: HTMLElement, target: HTMLElement) {
    return !view.contains(target) && view != target;
  }
}
