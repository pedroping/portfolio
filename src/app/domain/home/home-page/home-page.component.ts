import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuEventsFacade } from '@portifolio/features/feature-inital-menu';
import { TaskbarComponent } from '@portifolio/features/feature-taskbar';
@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [TaskbarComponent, RouterModule],
})
export class HomePageComponent {
  constructor(private readonly menuEventsFacade: MenuEventsFacade) {}

  toggleMenu() {
    this.menuEventsFacade.toggleMenu();
  }
}
