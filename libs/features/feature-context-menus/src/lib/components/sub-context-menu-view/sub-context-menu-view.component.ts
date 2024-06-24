import { Component } from '@angular/core';
import { OpenSubContextMenuDirective } from '../../directives/open-sub-context-menu/open-sub-context-menu.directive';
import { SubContextMenuIconsComponent } from '../sub-context-menu-icons/sub-context-menu-icons.component';

@Component({
  selector: 'sub-context-menu-view',
  templateUrl: './sub-context-menu-view.component.html',
  styleUrls: ['./sub-context-menu-view.component.scss'],
  standalone: true,
  imports: [OpenSubContextMenuDirective],
})
export class SubContextMenuViewComponent {
  iconsContextMenuComponent = SubContextMenuIconsComponent;
}
