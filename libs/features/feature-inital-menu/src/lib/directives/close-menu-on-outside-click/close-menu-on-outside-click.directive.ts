import {
  DestroyRef,
  Directive,
  ElementRef,
  NgZone,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, fromEvent, merge, skip, take } from 'rxjs';
import { MenuEventsFacade } from '../../facades/menu-events-facade';
import { PREVENT_TOGGLE_ID } from '../../mocks/menu-mocks';

@Directive({
  standalone: true,
})
export class CloseMenuOnOutsideClickDirective implements OnInit {
  constructor(
    private readonly ngZone: NgZone,
    private readonly destroyRef: DestroyRef,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly menuEventsFacade: MenuEventsFacade
  ) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      merge(fromEvent(document, 'click'), fromEvent(document, 'mousedown'))
        .pipe(
          skip(1),
          takeUntilDestroyed(this.destroyRef),
          filter((event) => {
            const isOutTarget = this.isOutTarget(event.target as HTMLElement);
            const hasPrevent =
              (event.target as HTMLElement).id === PREVENT_TOGGLE_ID;

            return isOutTarget && !hasPrevent;
          }),
          take(1)
        )
        .subscribe(() => {
          this.ngZone.run(() => {
            this.menuEventsFacade.setCloseMenu();
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
