import { Component } from '@angular/core';
import { UiNewTrelloPageComponent } from '@portifolio/ui/ui-new-trello-page';
import { ProgramComponent } from '../program/program.component';
import { IBasicProgram } from '../../models/program-models';

@Component({
  selector: 'menu-favorites',
  templateUrl: './menu-favorites.component.html',
  styleUrls: ['./menu-favorites.component.scss'],
  standalone: true,
  imports: [ProgramComponent],
})
export class MenuFavoritesComponent {
  program1Config = {
    config: {
      name: 'New Trello',
      sub: 'Handle cards here',
      baseSizes: {
        width: window.innerWidth * 0.8,
        height: window.innerHeight * 0.8,
      },
      customX: 50,
      customY: 50,
      pageContent: UiNewTrelloPageComponent,
      icon: '/assets/images/trello-icon.png',
    },
    domConfig: {
      opened: true,
    },
  };

  program2Config = {
    config: {
      name: 'Default Page',
      customX: 500,
      customY: 500,
      baseSizes: { width: 300, height: 200 },
    },
    domConfig: {
      opened: true,
      isFullScreen: false,
    },
  };

  gitHubProgram: IBasicProgram = {
    name: 'GitHub',
    sub: 'Repositórios',
    link: 'https://github.com/pedroping',
    icon: '/assets/images/github-icon.png',
  };

  linkedinProgram: IBasicProgram = {
    name: 'LinkedIn',
    sub: 'LinkedIn Profile',
    link: 'https://www.linkedin.com/in/pedro-henrique-chaves-669b10222/',
    icon: '/assets/images/linkedin-logo.png',
  };
}
