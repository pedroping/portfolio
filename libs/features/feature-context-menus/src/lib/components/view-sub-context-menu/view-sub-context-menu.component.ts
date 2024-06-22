import { Component } from '@angular/core';
import { OpenSubContextMenuDirective } from '../../directives/open-sub-context-menu/open-sub-context-menu.directive';
import { IconsSubContextMenuComponent } from '../icons-sub-context-menu/icons-sub-context-menu.component';

@Component({
  selector: 'view-sub-context-menu',
  templateUrl: './view-sub-context-menu.component.html',
  styleUrls: ['./view-sub-context-menu.component.scss'],
  standalone: true,
  imports: [OpenSubContextMenuDirective],
})
export class ViewSubContextMenuComponent {
  iconsContextMenuComponent = IconsSubContextMenuComponent;
}
