import { Component, signal } from '@angular/core';
import { LastZIndexService } from '@portifolio/utils/util-z-index-handler';
import { CloseMenuOnOutsideClickDirective } from '../../directives/close-menu-on-outside-click/close-menu-on-outside-click.directive';
import { MenuFooterActionsComponent } from '../menu-footer-actions/menu-footer-actions.component';

@Component({
  selector: 'initial-menu',
  templateUrl: './initial-menu.component.html',
  styleUrls: ['./initial-menu.component.scss'],
  standalone: true,
  host: {
    '[style.zIndex]': 'zIndex()',
  },
  hostDirectives: [CloseMenuOnOutsideClickDirective],
  imports: [MenuFooterActionsComponent],
})
export class InitialMenuComponent {
  zIndex = signal<string>('0');

  constructor(private readonly lastZIndexService: LastZIndexService) {
    this.zIndex.set(this.lastZIndexService.createNewZIndex());
  }
}
