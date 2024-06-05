import { Component } from '@angular/core';
import { ActualHourDirective } from '../../directives/actual-hour.directive';

@Component({
  selector: 'taskbar-actions',
  templateUrl: './taskbar-actions.component.html',
  styleUrls: ['./taskbar-actions.component.scss'],
  standalone: true,
  imports: [ActualHourDirective],
})
export class TaskbarActionsComponent {}
