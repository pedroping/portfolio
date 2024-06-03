import { Component, OnInit } from '@angular/core';
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
  constructor() {}

  ngOnInit() {}
}
