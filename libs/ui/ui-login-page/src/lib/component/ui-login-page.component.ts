import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'ui-login-page',
  templateUrl: './ui-login-page.component.html',
  styleUrls: ['./ui-login-page.component.scss'],
  standalone: true,
})
export class UiLoginPageComponent {
  constructor(private readonly router: Router) {}

  login() {
    const audio = new Audio('/assets/audios/videoplayback.m4a');
    audio.load();
    audio.play();
    this.router.navigate(['./home']);
  }
}
