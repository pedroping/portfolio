import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'menu-footer-actions',
  templateUrl: './menu-footer-actions.component.html',
  styleUrls: ['./menu-footer-actions.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class MenuFooterActionsComponent {}
