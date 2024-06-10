import { DestroyRef, Directive, NgZone, OnInit } from '@angular/core';
import { MenuEventsService } from '../../services/menu-events/menu-events.service';
import { fromEvent, map, pairwise } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  standalone: true,
})
export class MenuActionsDirective implements OnInit {
  constructor(
    private readonly ngZone: NgZone,
    private readonly destroyRef: DestroyRef,
    private readonly menuEventsService: MenuEventsService
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
      this.menuEventsService.setCloseMenu();
    });
  }

  openMenu() {
    this.ngZone.run(() => {
      this.menuEventsService.setOpenMenu();
    });
  }

  toggleMenu() {
    this.ngZone.run(() => {
      this.menuEventsService.toggleMenu();
    });
  }
}
