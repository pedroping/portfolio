import { Component } from '@angular/core';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component';

@Component({
  selector: 'ui-login-splash-screen',
  templateUrl: './ui-login-splash-screen.component.html',
  styleUrls: ['./ui-login-splash-screen.component.scss'],
  standalone: true,
  imports: [ProgressBarComponent],
})
export class UiLoginSplashScreenComponent {}
