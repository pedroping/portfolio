import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PREVENT_TOGGLE_ID } from '../../mocks/menu-mocks';
import { PreventElementDirective } from '../../directives/prevent-element/prevent-element.directive';

@Component({
  selector: 'menu-footer-actions',
  templateUrl: './menu-footer-actions.component.html',
  styleUrls: ['./menu-footer-actions.component.scss'],
  standalone: true,
  imports: [RouterLink, PreventElementDirective],
})
export class MenuFooterActionsComponent {
  preventToggleId = PREVENT_TOGGLE_ID;
}
