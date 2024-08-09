import { Directive, OnInit, ViewContainerRef } from '@angular/core';
import { EventsFacade } from '@portifolio/features/feature-page-creator';
import { BuildAnimation } from '@portifolio/utils/util-animations';
import { LastZIndexService } from '@portifolio/utils/util-z-index-handler';
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
  instance?: InitialMenuComponent;

  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly eventsFacade: EventsFacade,
    private readonly buildAnimation: BuildAnimation,
    private readonly menuEventsFacade: MenuEventsFacade,
    private readonly lastZIndexService: LastZIndexService,
  ) {}

  ngOnInit(): void {
    this.createMenu(true);
    this.destroyMenu();

    this.menuEventsFacade.openMenu$$.subscribe(() => this.createMenu());
    this.menuEventsFacade.closeMenu$$.subscribe(() => this.destroyMenu());
  }

  createMenu(preventShow?: boolean) {
    if (this.menuElement && this.instance) {
      this.instance.zIndex.set(this.lastZIndexService.createNewZIndex());

      this.buildAnimation
        .animate('enterAnimationY', this.menuElement)
        .subscribe(() => {
          if (!this.menuElement) return;
          this.menuElement.style.display = 'block';
        });
      return;
    }

    const { location, changeDetectorRef, instance } =
      this.vcr.createComponent(InitialMenuComponent);
    this.menuElement = location.nativeElement;
    this.instance = instance;
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
