import {
  DestroyRef,
  Directive,
  HostListener,
  NgZone,
  ViewRef,
  input,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WorkspaceReferenceFacade } from '@portifolio/utils/util-workspace-reference';
import { Subject, filter, fromEvent, merge, skip, take, takeUntil } from 'rxjs';
import { ContextMenuDefaultComponent } from '../../components/context-menu-default/context-menu-default.component';
import { ContextMenuProgramComponent } from '../../components/context-menu-program/context-menu-program.component';
import { MENU_GAP, WORKSPACE_ID } from '../../mocks/context-menu-mocks';
import {
  AvailableContextMenus,
  DefaultMenu,
} from '../../models/context-menu-models';
import { LastZIndexService } from '@portifolio/utils/util-z-index-handler';
import { ContextMenuFacade } from '../../facade/context-menu-facade.service';

@Directive({
  selector: '[openContextMenu]',
  standalone: true,
})
export class OpenContextMenuDirective {
  menuType = input<AvailableContextMenus>('program', {
    alias: 'openContextMenu',
  });
  id = input.required<number | string>();
  destroySubscription$ = new Subject<void>();
  hostView?: ViewRef;

  constructor(
    private readonly ngZone: NgZone,
    private readonly destroyRef: DestroyRef,
    private readonly lastZIndexService: LastZIndexService,
    private readonly contextMenuFacade: ContextMenuFacade<number | string>,
    private readonly workspaceReferenceFacade: WorkspaceReferenceFacade
  ) {}

  @HostListener('contextmenu', ['$event']) onClick(event: PointerEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.contextMenuFacade.setClearDefault();
    this.clearView();

    if (
      this.menuType() === 'default' &&
      (event.target as HTMLElement).id != WORKSPACE_ID
    )
      return;

    const menuComponent =
      this.menuType() === 'default'
        ? ContextMenuDefaultComponent
        : ContextMenuProgramComponent;

    const component =
      this.workspaceReferenceFacade.createComponent(menuComponent);

    const instance = component.componentRef.instance as DefaultMenu<
      number | string
    >;
    const menuView = component.componentRef.location
      .nativeElement as HTMLElement;

    instance.data = this.id();
    this.hostView = component.componentRef.hostView;

    const positions = { x: event.pageX + MENU_GAP, y: event.pageY };

    const boundarySizes = {
      width: this.workspaceReferenceFacade.element.offsetWidth,
      height: this.workspaceReferenceFacade.element.offsetHeight,
    };

    const menuSizes = {
      width: menuView.offsetWidth,
      height: menuView.offsetHeight,
    };
    const maxBounds = {
      x: boundarySizes.width - menuSizes.width,
      y: boundarySizes.height - menuSizes.height,
    };

    menuView.style.top = Math.min(positions.y, maxBounds.y) + 'px';
    menuView.style.left = Math.min(positions.x, maxBounds.x) + 'px';

    menuView.style.zIndex = this.lastZIndexService.createNewZIndex();

    this.createOutsideClickDestroy(menuView);
  }

  createOutsideClickDestroy(view: HTMLElement) {
    this.contextMenuFacade.clearDefault$$
      .pipe(
        takeUntil(this.destroySubscription$),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.clearView());

    this.ngZone.runOutsideAngular(() => {
      merge(fromEvent(document, 'click'), fromEvent(document, 'mousedown'))
        .pipe(
          skip(1),
          filter((event: Event) => {
            const isOutTarget = this.isOutTarget(
              view,
              event.target as HTMLElement
            );
            return isOutTarget;
          }),
          take(1),
          takeUntil(this.destroySubscription$),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(() => {
          this.ngZone.run(() => {
            this.clearView();
          });
        });
    });
  }

  clearView() {
    this.destroySubscription$.next();

    if (!this.hostView) return;

    this.workspaceReferenceFacade.clear(this.hostView);
    this.hostView = undefined;
  }

  isOutTarget(view: HTMLElement, target: HTMLElement) {
    return !view.contains(target) && view != target;
  }
}
