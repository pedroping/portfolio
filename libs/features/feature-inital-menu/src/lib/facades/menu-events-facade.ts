import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { PreventElementsService } from '../services/prevent-elements.service';

@Injectable({ providedIn: 'root' })
export class MenuEventsFacade {
  private readonly openMenu$ = new Subject<void>();
  private readonly closeMenu$ = new Subject<void>();
  private readonly menuAction$ = new Subject<number>();
  private readonly menuOpened$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly preventElementsService: PreventElementsService,
  ) {}

  pushElement(element: HTMLElement) {
    this.preventElementsService.pushElement(element);
  }

  hasElement(element: HTMLElement) {
    return this.preventElementsService.hasElement(element);
  }

  setOpenMenu() {
    this.menuOpened$.next(true);
    this.openMenu$.next();
  }

  setCloseMenu() {
    this.menuOpened$.next(false);
    this.closeMenu$.next();
  }

  setMenuAction(id: number) {
    this.menuAction$.next(id);
  }

  toggleMenu() {
    this.menuOpened ? this.setCloseMenu() : this.setOpenMenu();
  }

  get menuOpened() {
    return this.menuOpened$.value;
  }

  get menuOpened$$() {
    return this.menuOpened$.asObservable();
  }

  get openMenu$$() {
    return this.openMenu$.asObservable();
  }

  get closeMenu$$() {
    return this.closeMenu$.asObservable();
  }

  get menuAction$$() {
    return this.menuAction$.asObservable();
  }
}
