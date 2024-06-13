import { Component, output } from '@angular/core';
import { PREVENT_TOGGLE_ID } from '@portifolio/features/feature-inital-menu';
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
  startClick = output<void>();
  preventToggleId = PREVENT_TOGGLE_ID;
}
