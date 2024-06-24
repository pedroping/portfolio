import {
  DestroyRef,
  Directive,
  ElementRef,
  HostListener,
  NgZone,
  ViewContainerRef,
  input,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, fromEvent, merge, skip, take } from 'rxjs';
import { ContextMenuDefaultComponent } from '../../components/context-menu-default/context-menu-default.component';
import { ContextMenuProgramComponent } from '../../components/context-menu-program/context-menu-program.component';
import { MENU_GAP, WORKSPACE_ID } from '../../mocks/context-menu-mocks';
import { AvailableContextMenus } from '../../models/context-menu-models';

@Directive({
  selector: '[openContextMenu]',
  standalone: true,
})
export class OpenContextMenuDirective {
  menuType = input.required<AvailableContextMenus>({
    alias: 'openContextMenu',
  });

  constructor(
    private readonly ngZone: NgZone,
    private readonly vcr: ViewContainerRef,
    private readonly destroyRef: DestroyRef,
    private readonly elementRef: ElementRef<HTMLElement>
  ) {}

  @HostListener('contextmenu', ['$event']) onClick(event: PointerEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.vcr.clear();

    if (
      this.menuType() === 'default' &&
      (event.target as HTMLElement).id != WORKSPACE_ID
    )
      return;

    const menuComponent =
      this.menuType() === 'default'
        ? ContextMenuDefaultComponent
        : ContextMenuProgramComponent;

    const menuView = this.vcr.createComponent(menuComponent).location
      .nativeElement as HTMLElement;

    const positions = { x: event.pageX + MENU_GAP, y: event.pageY };

    const boundarySizes = {
      width: this.elementRef.nativeElement.offsetWidth,
      height: this.elementRef.nativeElement.offsetHeight,
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

    this.createOutsideClickDestroy(menuView);
  }

  createOutsideClickDestroy(view: HTMLElement) {
    this.ngZone.runOutsideAngular(() => {
      merge(fromEvent(document, 'click'), fromEvent(document, 'mousedown'))
        .pipe(
          skip(1),
          takeUntilDestroyed(this.destroyRef),
          filter((event: Event) => {
            const isOutTarget = this.isOutTarget(
              view,
              event.target as HTMLElement
            );
            return isOutTarget;
          }),
          take(1)
        )
        .subscribe(() => {
          this.ngZone.run(() => {
            this.vcr.clear();
          });
        });
    });
  }

  isOutTarget(view: HTMLElement, target: HTMLElement) {
    return !view.contains(target) && view != target;
  }
}
