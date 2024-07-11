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
    this.destroyMenu();

    this.menuEventsFacade.openMenu$$.subscribe(() => this.createMenu());
    this.menuEventsFacade.closeMenu$$.subscribe(() => this.destroyMenu());
  }

  createMenu() {
    this.destroyMenu();
    const { location, changeDetectorRef } =
      this.vcr.createComponent(InitialMenuComponent);
    this.menuElement = location.nativeElement;
    this.buildAnimation.animate('enterAnimationY', location.nativeElement);
    this.eventsFacade.setCreateOverlay();
    changeDetectorRef.detectChanges();
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
