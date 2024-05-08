import { Component, output } from '@angular/core';
import { PagesListComponent } from '../pages-list/pages-list.component';

@Component({
  selector: 'feature-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.scss'],
  standalone: true,
  imports: [PagesListComponent],
})
export class TaskbarComponent {
  startClick = output<void>();
}
