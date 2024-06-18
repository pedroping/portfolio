import { DestroyRef, Directive, NgZone, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MenuEventsFacade } from '@portifolio/utils/util-facades';
import { fromEvent } from 'rxjs';

@Directive({
  standalone: true,
})
export class MenuActionsDirective implements OnInit {
  constructor(
    private readonly ngZone: NgZone,
    private readonly destroyRef: DestroyRef,
    private readonly menuEventsFacade: MenuEventsFacade
  ) {}

  ngOnInit(): void {
    this.keyEvents();
  }

  keyEvents() {
    this.ngZone.runOutsideAngular(() => {
      fromEvent<KeyboardEvent>(document, 'keyup')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((event) => {
          if (event.key === 'M' && !!event.shiftKey) return this.closeMenu();
          if (event.key === 'Meta' && !!event.shiftKey)
            return this.toggleMenu();
          if (event.key === 'Escape') return this.closeMenu();
        });
    });
  }

  closeMenu() {
    this.ngZone.run(() => {
      this.menuEventsFacade.setCloseMenu();
    });
  }

  openMenu() {
    this.ngZone.run(() => {
      this.menuEventsFacade.setOpenMenu();
    });
  }

  toggleMenu() {
    this.ngZone.run(() => {
      this.menuEventsFacade.toggleMenu();
    });
  }
}
