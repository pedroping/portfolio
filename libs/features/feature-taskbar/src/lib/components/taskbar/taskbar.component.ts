import { Component, output } from '@angular/core';
import { PagesListComponent } from '../pages-list/pages-list.component';
import { TaskbarActionsComponent } from '../taskbar-actions/taskbar-actions.component';
import { PREVENT_TOGGLE_ID } from '@portifolio/features/feature-inital-menu';

@Component({
  selector: 'feature-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.scss'],
  standalone: true,
  imports: [PagesListComponent, TaskbarActionsComponent],
})
export class TaskbarComponent {
  startClick = output<void>();
  preventToggleId = PREVENT_TOGGLE_ID;
}
