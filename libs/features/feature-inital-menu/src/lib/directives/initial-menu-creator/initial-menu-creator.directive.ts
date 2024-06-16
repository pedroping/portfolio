import { Directive, OnInit, ViewContainerRef } from '@angular/core';
import { BuildAnimation } from '@portifolio/utils/util-animations';
import { InitialMenuComponent } from '../../components/initial-menu/initial-menu.component';
import { MenuEventsService } from '../../../../../../utils/util-events/src/lib/menu-events/menu-events.service';
import { MenuActionsDirective } from '../menu-actions/menu-actions.directive';
import { take } from 'rxjs';
@Directive({
  selector: 'initial-menu-creator',
  hostDirectives: [MenuActionsDirective],
  standalone: true,
})
export class InitialMenuCreatorDirective implements OnInit {
  menuElement?: HTMLElement;

  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly buildAnimation: BuildAnimation,
    private readonly menuEventsService: MenuEventsService
  ) {}

  ngOnInit(): void {
    this.destroyMenu();

    this.menuEventsService.openMenu$$.subscribe(() => this.createMenu());
    this.menuEventsService.closeMenu$$.subscribe(() => this.destroyMenu());
  }

  createMenu() {
    this.destroyMenu();
    const { location } = this.vcr.createComponent(InitialMenuComponent);
    this.menuElement = location.nativeElement;
    this.buildAnimation.animate('enterAnimationY', location.nativeElement);
  }

  destroyMenu() {
    if (!this.menuElement) return this.vcr.clear();

    this.buildAnimation
      .animate('leaveAnimationY', this.menuElement)
      .pipe(take(1))
      .subscribe(() => {
        this.vcr.clear();
        this.menuElement = undefined;
      });
  }
}
