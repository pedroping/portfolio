import { Component } from '@angular/core';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
  selector: 'ui-splash-screen',
  templateUrl: './ui-splash-screen.component.html',
  styleUrls: ['./ui-splash-screen.component.scss'],
  standalone: true,
  imports: [ProgressBarComponent],
})
export class UiSplashScreenComponent {}
