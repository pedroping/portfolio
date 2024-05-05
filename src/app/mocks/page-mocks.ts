import { TestPageComponent } from '../shared/test-page/test-page.component';

export const PAGE_01 = {
  config: {
    name: 'Pagina',
    baseSizes: { width: 300, height: 200 },
  },
  domConfig: {
    opened: false,
  },
};

export const PAGE_02 = {
  config: {
    name: 'Pagina2',
    baseSizes: { width: 200, height: 250 },
    customX: 100,
    customY: 150,
    pageContent: TestPageComponent,
  },
  domConfig: {
    opened: false,
    isFullScreen: true,
  },
};
