import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UiLoginPageComponent } from '@portifolio/ui/ui-login-page';
import { ShowScreenDirective } from '@portifolio/ui/ui-splash-screen';
@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  standalone: true,
  imports: [UiLoginPageComponent, ShowScreenDirective],
})
export class LoginPageComponent implements OnInit {
  hideSplashScreen = signal<boolean>(true);
  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.hideSplashScreen.set(!!params['noSplash']);
    });
  }
}
