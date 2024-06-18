import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TaskbarComponent } from '@portifolio/features/feature-taskbar';
import { MenuEventsFacede } from '@portifolio/utils/util-facades';
@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [TaskbarComponent, RouterModule],
})
export class HomePageComponent {
  constructor(private readonly menuEventsFacede: MenuEventsFacede) {}

  toggleMenu() {
    this.menuEventsFacede.toggleMenu();
  }
}
