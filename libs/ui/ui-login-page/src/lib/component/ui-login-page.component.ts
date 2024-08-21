import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AVAILABLE_ROUTES } from '@portifolio/utils/util-routes';
@Component({
  selector: 'ui-login-page',
  templateUrl: './ui-login-page.component.html',
  styleUrls: ['./ui-login-page.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class UiLoginPageComponent {
  constructor(private readonly router: Router) {}

  login() {
    const audio = new Audio('/assets/audios/start.m4a');
    audio.load();
    audio.play();
    this.router.navigate(['./' + AVAILABLE_ROUTES.HOME]);
  }
}
