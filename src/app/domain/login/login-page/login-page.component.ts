import { Component, OnInit } from '@angular/core';
import { UiLoginPageComponent } from '@portifolio/ui/ui-login-page';
@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  standalone: true,
  imports: [UiLoginPageComponent],
})
export class LoginPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
