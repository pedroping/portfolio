import { Component } from '@angular/core';
import { UiNewTrelloPageComponent } from '@portifolio/ui/ui-new-trello-page';
import { ProgamComponent } from '../progam/progam.component';
import { IBasicProgram } from '../../models/program-models';

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
      pageContent: UiNewTrelloPageComponent,
      icon: '/assets/images/trello-icon.png',
    },
    domConfig: {
      opened: true,
    },
  };

  gitHubProgram: IBasicProgram = {
    name: 'GitHub',
    sub: 'Meus repositórios',
    link: 'https://github.com/pedroping',
    icon: '/assets/images/github-icon.png',
  };
}
