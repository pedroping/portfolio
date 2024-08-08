import { Directive, OnInit, ViewContainerRef } from '@angular/core';
import { EventsFacade } from '@portifolio/features/feature-page-creator';
import { BuildAnimation } from '@portifolio/utils/util-animations';
import { take } from 'rxjs';
import { InitialMenuComponent } from '../../components/initial-menu/initial-menu.component';
import { MenuEventsFacade } from '../../facades/menu-events-facade';
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
    private readonly eventsFacade: EventsFacade,
    private readonly buildAnimation: BuildAnimation,
    private readonly menuEventsFacade: MenuEventsFacade,
  ) {}

  ngOnInit(): void {
    this.createMenu(true);
    this.destroyMenu();

    this.menuEventsFacade.openMenu$$.subscribe(() => this.createMenu());
    this.menuEventsFacade.closeMenu$$.subscribe(() => this.destroyMenu());
  }

  createMenu(preventShow?: boolean) {
    if (this.menuElement) {
      this.buildAnimation
        .animate('enterAnimationY', this.menuElement)
        .subscribe(() => {
          if (!this.menuElement) return;
          this.menuElement.style.display = 'block';
        });
      return;
    }

    const { location, changeDetectorRef } =
      this.vcr.createComponent(InitialMenuComponent);
    this.menuElement = location.nativeElement;
    this.eventsFacade.setCreateOverlay();
    changeDetectorRef.detectChanges();

    if (preventShow) {
      location.nativeElement.style.display = 'none';
      return;
    }

    this.buildAnimation.animate('enterAnimationY', location.nativeElement);
  }

  destroyMenu() {
    if (!this.menuElement) return this.vcr.clear();

    this.buildAnimation
      .animate('leaveAnimationY', this.menuElement)
      .pipe(take(1))
      .subscribe(() => {
        if (!this.menuElement) return;
        this.menuElement.style.display = 'none';
      });
  }
}
