import { Component, signal } from '@angular/core';
import { LastZIndexService } from '@portifolio/utils/util-z-index-handler';
import { CloseMenuOnOutsideClickDirective } from '../../directives/close-menu-on-outside-click/close-menu-on-outside-click.directive';
import { MenuFavoritesComponent } from '../menu-favorites/menu-favorites.component';
import { MenuFooterActionsComponent } from '../menu-footer-actions/menu-footer-actions.component';
import { MenuShortcutsComponent } from '../menu-shortcuts/menu-shortcuts.component';

@Component({
  selector: 'initial-menu',
  templateUrl: './initial-menu.component.html',
  styleUrls: ['./initial-menu.component.scss'],
  standalone: true,
  host: {
    '[style.zIndex]': 'zIndex()',
  },
  hostDirectives: [CloseMenuOnOutsideClickDirective],
  imports: [
    MenuFooterActionsComponent,
    MenuFavoritesComponent,
    MenuShortcutsComponent,
  ],
})
export class InitialMenuComponent {
  zIndex = signal<string>('0');

  constructor(private readonly lastZIndexService: LastZIndexService) {
    this.zIndex.set(this.lastZIndexService.createNewZIndex());
  }
}
