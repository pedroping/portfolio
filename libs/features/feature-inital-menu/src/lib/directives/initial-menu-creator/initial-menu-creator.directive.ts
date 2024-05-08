import { Directive, OnInit, ViewContainerRef } from '@angular/core';
import { InitialMenuComponent } from '../../components/initial-menu/initial-menu.component';
import { MenuEventsService } from '../../services/menu-events/menu-events.service';

@Directive({
  selector: 'initial-menu-creator',
  standalone: true,
})
export class InitialMenuCreatorDirective implements OnInit {
  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly menuEventsService: MenuEventsService
  ) {}

  ngOnInit(): void {
    this.destroyMenu();

    this.menuEventsService.openMenu$$.subscribe(() => this.createMenu());
    this.menuEventsService.closeMenu$$.subscribe(() => this.destroyMenu());
  }

  createMenu() {
    this.destroyMenu();
    this.vcr.createComponent(InitialMenuComponent);
  }

  destroyMenu() {
    this.vcr.clear();
  }
}
