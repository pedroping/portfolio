import { Component } from '@angular/core';
import { AppDropHandleDirective } from '@portifolio/features/feature-app-icon';

@Component({
  selector: 'app-holder',
  templateUrl: './app-holder.component.html',
  styleUrls: ['./app-holder.component.scss'],
  standalone: true,
  imports: [AppDropHandleDirective],
})
export class AppHolderComponent {}
