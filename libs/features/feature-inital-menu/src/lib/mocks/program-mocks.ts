import { IFolderData, IPageMock } from '@portifolio/utils/util-models';
import { IBasicProgram } from '../models/program-models';

export const WORKSPACE_ID = 0;
export const ELEMENT_BASE_ICON = '/assets/images/windows-basic-folder.png';

export const PROGRAM_1_CONFIG: IPageMock = {
  config: {
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
};

export const PROGRAM_2_CONFIG: IPageMock = {
  data: { folderId: 0 },
  config: {
    name: 'File Explorer',
    customX: 500,
    customY: 500,
    baseSizes: { width: 600, height: 500, minHeight: 500, minWidth: 600 },
    pageContent: import('@portifolio/features/feature-file-explorer').then(
      (c) => c.FileExplorerComponent,
    ),
    opened: true,
    isFullScreen: false,
  },
};

export const DESKTOP_CONFIG: IPageMock<IFolderData> = {
  data: { folderId: 0 },
  config: {
    name: 'Desktop',
    icon: '/assets/images/hard-disk.png',
    customX: 500,
    customY: 500,
    baseSizes: { width: 600, height: 500, minHeight: 500, minWidth: 600 },
    pageContent: import('@portifolio/features/feature-file-explorer').then(
      (c) => c.FileExplorerComponent,
    ),
    opened: true,
    isFullScreen: false,
  },
};

export const PROGRAM_3_CONFIG: IPageMock = {
  config: {
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
};

export const PROGRAM_4_CONFIG: IPageMock = {
  config: {
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
};

export const GITHUB_PROGRAM: IBasicProgram = {
  name: 'GitHub',
  sub: 'Repositories',
  link: 'https://github.com/pedroping',
  icon: '/assets/images/github-icon.png',
};

export const LINKEDIN_PROGRAM: IBasicProgram = {
  name: 'LinkedIn',
  sub: 'LinkedIn Profile',
  link: 'https://www.linkedin.com/in/pedro-henrique-chaves-669b10222/',
  icon: '/assets/images/linkedin-logo.png',
};

export const REPOSITORY_PROGRAM: IBasicProgram = {
  name: 'Repository ',
  sub: "Project's repository",
  link: 'https://github.com/pedroping/portfolio',
  icon: '/assets/images/git-repository-icon.png',
};
