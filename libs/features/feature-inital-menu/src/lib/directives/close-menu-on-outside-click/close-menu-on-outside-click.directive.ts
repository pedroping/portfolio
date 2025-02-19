import {
  DestroyRef,
  Directive,
  ElementRef,
  NgZone,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, fromEvent, merge, skip } from 'rxjs';
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
    private readonly menuEventsFacade: MenuEventsFacade,
  ) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      merge(
        fromEvent(document, 'click'),
        fromEvent(document, 'mousedown'),
      )
        .pipe(
          skip(1),
          takeUntilDestroyed(this.destroyRef),
          filter((event) => {
            const target = event.target as HTMLElement;
            const isOutTarget = this.isOutTarget(target);
            const hasPrevent =
              target.id === PREVENT_TOGGLE_ID ||
              this.menuEventsFacade.hasElement(target);

            return isOutTarget && !hasPrevent;
          }),
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
