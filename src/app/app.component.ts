import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PreventTurnOffOninitDirective } from '@portifolio/utils/util-routes';

@Component({
  selector: 'root',
  standalone: true,
  imports: [RouterModule],
  hostDirectives: [PreventTurnOffOninitDirective],
  template: '<main><router-outlet></router-outlet></main>',
})
export class AppComponent {
  title = 'portifolio';
}
