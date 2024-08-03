import { IInitialConfig } from '@portifolio/utils/util-models';

export const FIXED_ICONS: IInitialConfig[] = [
  {
    name: 'Curriculum',
    sub: 'My Curriculum',
    baseSizes: {
      width: window.innerWidth * 0.8,
      height: window.innerHeight * 0.8,
      minWidth: 850,
      minHeight: window.innerHeight * 0.5,
    },
    customX: 50,
    customY: 50,
    pageContent: import('@portifolio/ui/ui-curriculum-page').then(
      (c) => c.CurriculumPageComponent,
    ),
    icon: '/assets/images/pdf-icon.png',
    opened: true,
  },
  {
    name: 'Web Workers',
    sub: 'How use web workers',
    baseSizes: {
      width: window.innerWidth * 0.8,
      height: window.innerHeight * 0.8,
      minWidth: 850,
      minHeight: window.innerHeight * 0.5,
    },
    customX: 50,
    customY: 50,
    pageContent: import('@portifolio/ui/ui-web-workers-page').then(
      (c) => c.WebWorkersPageComponent,
    ),
    icon: '/assets/images/gear-icon.png',
    opened: true,
  },
  {
    name: 'New Trello',
    sub: 'Handle cards here',
    baseSizes: {
      width: window.innerWidth * 0.8,
      height: window.innerHeight * 0.8,
      minWidth: window.innerWidth * 0.3,
      minHeight: window.innerHeight * 0.5,
    },
    customX: 50,
    customY: 50,
    pageContent: import('@portifolio/ui/ui-new-trello-page').then(
      (c) => c.UiNewTrelloPageComponent,
    ),
    icon: '/assets/images/trello-icon.png',
    opened: true,
  },
];
