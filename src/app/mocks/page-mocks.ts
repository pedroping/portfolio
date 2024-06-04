import {
  IDomElementOptions,
  IInitialConfig,
} from '@portifolio/features/feature-page-creator';
import { TestPageComponent } from '../shared/test-page/test-page.component';

type IMocks = { config: IInitialConfig; domConfig: IDomElementOptions };

export const PAGE_01: IMocks = {
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

export const PAGE_02: IMocks = {
  config: {
    name: 'Pagina2',
    baseSizes: { width: window.innerWidth / 2, height: window.innerHeight / 2 },
    customX: 100,
    customY: 150,
    pageContent: TestPageComponent,
  },
  domConfig: {
    opened: true,
  },
};

export const PAGE_03: IMocks = {
  config: {
    name: 'Pagina3',
    baseSizes: { width: window.innerWidth / 2, height: window.innerHeight / 2 },
    customX: window.innerWidth / 2,
    customY: window.innerHeight / 2,
    pageContent: TestPageComponent,
  },
  domConfig: {
    opened: true,
  },
};
