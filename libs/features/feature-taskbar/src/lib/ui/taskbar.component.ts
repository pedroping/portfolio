import { Component } from '@angular/core';
import {
  MenuEventsFacade,
  PREVENT_TOGGLE_ID,
} from '@portifolio/features/feature-inital-menu';
import { PagesListComponent } from '../components/pages-list/pages-list.component';
import { TaskbarActionsComponent } from '../components/taskbar-actions/taskbar-actions.component';

@Component({
  selector: 'feature-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.scss'],
  standalone: true,
  imports: [PagesListComponent, TaskbarActionsComponent],
})
export class TaskbarComponent {
  preventToggleId = PREVENT_TOGGLE_ID;

  constructor(private readonly menuEventsFacade: MenuEventsFacade) {}

  toggleMenu() {
    this.menuEventsFacade.toggleMenu();
  }
}
