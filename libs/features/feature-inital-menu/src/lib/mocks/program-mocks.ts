import { UiNewTrelloPageComponent } from '@portifolio/ui/ui-new-trello-page';
import { IBasicProgram } from '../models/program-models';

export const ELEMENT_BASE_ICON = '/assets/images/windows-basic-folder.png';

export const PROGRAM_1_CONFIG = {
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

export const PROGRAM_2_CONFIG = {
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

export const GITHUB_PROGRAM: IBasicProgram = {
  name: 'GitHub',
  sub: 'Repositórios',
  link: 'https://github.com/pedroping',
  icon: '/assets/images/github-icon.png',
};
export const LINKEDIN_PROGRAM: IBasicProgram = {
  name: 'LinkedIn',
  sub: 'LinkedIn Profile',
  link: 'https://www.linkedin.com/in/pedro-henrique-chaves-669b10222/',
  icon: '/assets/images/linkedin-logo.png',
};
