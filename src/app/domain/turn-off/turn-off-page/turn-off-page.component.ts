import { Component } from '@angular/core';
import { ShowScreenDirective } from '@portifolio/ui/ui-splash-screen';
import { TurnOffComponent } from '@portifolio/ui/ui-turn-off-page';

@Component({
  selector: 'turn-off-page',
  templateUrl: './turn-off-page.component.html',
  styleUrls: ['./turn-off-page.component.scss'],
  standalone: true,
  imports: [TurnOffComponent, ShowScreenDirective],
})
export class TurnOffPageComponent {}
