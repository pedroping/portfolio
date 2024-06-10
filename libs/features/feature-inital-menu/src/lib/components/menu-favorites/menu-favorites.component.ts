import { Component } from '@angular/core';
import { ProgamComponent } from '../progam/progam.component';

@Component({
  selector: 'menu-favorites',
  templateUrl: './menu-favorites.component.html',
  styleUrls: ['./menu-favorites.component.scss'],
  standalone: true,
  imports: [ProgamComponent],
})
export class MenuFavoritesComponent {
  program1Config = {
    config: {
      name: 'New Trello',
      sub: 'Your cards here',
      baseSizes: {
        width: window.innerWidth / 2 + 20,
        height: window.innerHeight / 2 + 20,
      },
      customX: window.innerWidth / 2,
      customY: window.innerHeight / 2,
      icon: '/assets/images/trello-icon.png',
    },
    domConfig: {
      opened: true,
    },
  };
}
