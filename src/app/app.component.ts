import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'root',
  template: '<main><router-outlet></router-outlet></main>',
})
export class AppComponent {
  title = 'portifolio';
}
