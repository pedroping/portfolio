import { Component } from '@angular/core';
import { OpenSubContextMenuDirective } from '../../directives/open-sub-context-menu/open-sub-context-menu.directive';
import { ViewSubContextMenuComponent } from '../view-sub-context-menu/view-sub-context-menu.component';

@Component({
  selector: 'default-context-menu',
  templateUrl: './default-context-menu.component.html',
  styleUrls: ['./default-context-menu.component.scss'],
  standalone: true,
  imports: [OpenSubContextMenuDirective],
})
export class DefaultContextMenuComponent {
  viewContextMenuComponent = ViewSubContextMenuComponent;
}
