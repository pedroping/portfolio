import { Directive, OnInit, ViewContainerRef } from '@angular/core';
import { BuildAnimation } from '@portifolio/utils/util-animations';
import { MenuEventsFacede } from '@portifolio/utils/util-facades';
import { take } from 'rxjs';
import { InitialMenuComponent } from '../../components/initial-menu/initial-menu.component';
import { MenuActionsDirective } from '../menu-actions/menu-actions.directive';
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
    private readonly menuEventsFacede: MenuEventsFacede
  ) {}

  ngOnInit(): void {
    this.destroyMenu();

    this.menuEventsFacede.openMenu$$.subscribe(() => this.createMenu());
    this.menuEventsFacede.closeMenu$$.subscribe(() => this.destroyMenu());
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
