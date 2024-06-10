import { IPageMock } from '@portifolio/features/feature-page-creator';
import { TestPageComponent } from '../shared/test-page/test-page.component';

export const PAGE_01: IPageMock = {
  config: {
    name: 'Pagina',
    customX: 500,
    customY: 500,
    baseSizes: { width: 300, height: 200 },
  },
  domConfig: {
    opened: true,
    isFullScreen: false,
  },
};

export const PAGE_02: IPageMock = {
  config: {
    name: 'Pagina2',
    baseSizes: {
      width: window.innerWidth / 2 + 20,
      height: window.innerHeight / 2 + 20,
    },
    customX: 100,
    customY: 150,
    pageContent: TestPageComponent,
    icon: '/assets/images/trello-icon.png',
  },
  domConfig: {
    opened: true,
  },
};

export const PAGE_03: IPageMock = {
  config: {
    name: 'Pagina3',
    baseSizes: {
      width: window.innerWidth / 2 + 20,
      height: window.innerHeight / 2 + 20,
    },
    customX: window.innerWidth / 2,
    customY: window.innerHeight / 2,
    pageContent: TestPageComponent,
    icon: '/assets/images/trello-icon.png',
  },
  domConfig: {
    opened: true,
  },
};
