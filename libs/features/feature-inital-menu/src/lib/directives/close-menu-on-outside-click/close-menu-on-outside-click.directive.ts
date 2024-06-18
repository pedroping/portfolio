import {
  DestroyRef,
  Directive,
  ElementRef,
  NgZone,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MenuEventsFacede } from '@portifolio/utils/util-facades';
import { fromEvent, merge, skip } from 'rxjs';
import { PREVENT_TOGGLE_ID } from '../../mocks/menu-mocks';

@Directive({
  standalone: true,
})
export class CloseMenuOnOutsideClickDirective implements OnInit {
  constructor(
    private readonly ngZone: NgZone,
    private readonly destroyRef: DestroyRef,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly menuEventsFacede: MenuEventsFacede
  ) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      merge(fromEvent(document, 'click'), fromEvent(document, 'mousedown'))
        .pipe(skip(1), takeUntilDestroyed(this.destroyRef))
        .subscribe((event: Event) => {
          const isOutTarget = this.isOutTarget(event.target as HTMLElement);
          const hasPrevent =
            (event.target as HTMLElement).id === PREVENT_TOGGLE_ID;

          if (!isOutTarget || hasPrevent) return;

          this.ngZone.run(() => {
            this.menuEventsFacede.setCloseMenu();
          });
        });
    });
  }

  isOutTarget(target: HTMLElement) {
    return (
      !this.elementRef.nativeElement.contains(target) &&
      this.elementRef.nativeElement != target
    );
  }
}
