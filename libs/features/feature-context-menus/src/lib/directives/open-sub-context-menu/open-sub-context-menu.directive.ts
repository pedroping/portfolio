import {
  Directive,
  ElementRef,
  HostListener,
  NgZone,
  Type,
  ViewContainerRef,
  input,
} from '@angular/core';
import {
  debounceTime,
  filter,
  fromEvent,
  merge,
  startWith,
  take,
  tap,
  timer,
} from 'rxjs';

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
    private readonly elementRef: ElementRef<HTMLElement>
  ) {}

  @HostListener('mouseenter') onMouseEnter() {
    let preventShow = false;

    const mouseLeave$ = fromEvent(
      this.elementRef.nativeElement,
      'mouseleave'
    ).pipe(tap(() => (preventShow = true)));

    mouseLeave$
      .pipe(
        startWith(undefined),
        debounceTime(500),
        take(1),
        filter(() => !preventShow)
      )
      .subscribe(() => this.openMenu());
  }

  @HostListener('click') openMenu() {
    this.vcr.clear();
    const rect = this.elementRef.nativeElement.getBoundingClientRect();

    const view = this.vcr.createComponent(this.menuComponent()).location
      .nativeElement as HTMLElement;

    view.style.top = rect.top + 'px';
    view.style.left = rect.left + rect.width + 'px';

    this.createDestroyTimeOut(view);
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
        timer(2000, 2000).pipe(filter(() => !this.hasHover(view)))
      )
        .pipe(take(1))
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
