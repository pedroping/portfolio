import {
  IFolderData,
  IInitialConfig,
  IPageMock,
  TBasicApp,
} from '@portifolio/utils/util-models';
import { IBasicProgram } from '../models/program-models';

export const WORKSPACE_ID = 0;
export const ALL_FILES_FOLDER_ID = -1;
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
    pageContent: () =>
      import('@portifolio/ui/ui-new-trello-page').then(
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
    pageContent: () =>
      import('@portifolio/features/feature-file-explorer').then(
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
    pageContent: () =>
      import('@portifolio/features/feature-file-explorer').then(
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
    pageContent: () =>
      import('@portifolio/ui/ui-web-workers-page').then(
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
    pageContent: () =>
      import('@portifolio/ui/ui-curriculum-page').then(
        (c) => c.CurriculumPageComponent,
      ),
    icon: '/assets/images/pdf-icon.png',
    opened: true,
  },
};

export const HELP_AND_SUPPORT: IPageMock = {
  config: {
    name: 'Help and Support',
    baseSizes: {
      width: 350,
      height: window.innerHeight * 0.5,
      minWidth: 350,
      minHeight: window.innerHeight * 0.5,
    },
    customX: window.innerWidth * 0.2,
    customY: window.innerHeight * 0.2,
    pageContent: () =>
      import('@portifolio/ui/ui-help-and-suport-page').then(
        (c) => c.UiHelpAndSuportPageComponent,
      ),
    icon: '/assets/images/info-icon.png',
    opened: true,
  },
};

export const CONTACT_ME_FOLDER = {
  config: {
    name: 'Contact me',
    customX: 500,
    customY: 500,
    baseSizes: { width: 500, height: 380, minHeight: 380, minWidth: 500 },
    pageContent: () =>
      import('@portifolio/features/feature-get-in-touch').then(
        (c) => c.GetInTouchComponent,
      ),
    opened: true,
    icon: '/assets/images/text-me.png',
    isFullScreen: false,
  },
};

const CURRICULUM_FOLDER: IInitialConfig = {
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
  pageContent: () =>
    import('@portifolio/ui/ui-curriculum-page').then(
      (c) => c.CurriculumPageComponent,
    ),
  icon: '/assets/images/pdf-icon.png',
  opened: true,
};

const WEB_WORKERS = {
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
  pageContent: () =>
    import('@portifolio/ui/ui-web-workers-page').then(
      (c) => c.WebWorkersPageComponent,
    ),
  icon: '/assets/images/gear-icon.png',
  opened: true,
};

const NEW_TRELLO = {
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
  pageContent: () =>
    import('@portifolio/ui/ui-new-trello-page').then(
      (c) => c.UiNewTrelloPageComponent,
    ),
  icon: '/assets/images/trello-icon.png',
  opened: true,
};

const ABOUT_ME: IInitialConfig = {
  name: 'About Me',
  icon: '/assets/images/about-me.png',
  customX: 500,
  customY: 500,
  baseSizes: {
    width: window.innerWidth * 0.5,
    height: window.innerHeight * 0.5,
    minWidth: 500,
    minHeight: 500,
  },
  opened: true,
  isFullScreen: false,
  pageContent: () =>
    import('@portifolio/ui/ui-about-me').then((c) => c.AboutMePageComponent),
};

const EXPERIENCE = {
  name: 'Experience',
  icon: '/assets/images/person-icon.png',
  customX: 500,
  customY: 500,
  baseSizes: {
    width: window.innerWidth * 0.5,
    height: window.innerHeight * 0.5,
    minWidth: 500,
    minHeight: 500,
  },
  opened: true,
  isFullScreen: false,
  pageContent: () =>
    import('@portifolio/ui/ui-experience-page').then(
      (c) => c.UiExperienceComponent,
    ),
};

export const RECYCLE_FOLDER = {
  name: 'File Explorer',
  customX: 500,
  customY: 500,
  baseSizes: { width: 600, height: 500, minHeight: 500, minWidth: 600 },
  pageContent: () =>
    import('@portifolio/features/feature-file-explorer').then(
      (c) => c.FileExplorerComponent,
    ),
  opened: true,
  icon: '/assets/images/recycle-bin.png',
  isFullScreen: false,
};

export const INITALfOLDER_APPS: { [key: string]: TBasicApp[] } = {
  'My Documents': [
    {
      name: 'Curriculum',
      logo: '/assets/images/pdf-icon.png',
      type: 'file',
      parentFolderId: 0,
      initialPageConfig: CURRICULUM_FOLDER,
    },
    {
      name: 'My Experience',
      logo: '/assets/images/person-icon.png',
      type: 'file',
      parentFolderId: 0,
      initialPageConfig: EXPERIENCE,
    },
    {
      name: 'About Me',
      logo: '/assets/images/about-me.png',
      type: 'file',
      parentFolderId: 0,
      initialPageConfig: ABOUT_ME,
    },
  ],
  'My Apps': [
    {
      name: 'Get in touch',
      logo: '/assets/images/text-me.png',
      type: 'file',
      parentFolderId: 0,
      initialPageConfig: CONTACT_ME_FOLDER.config,
    },
    {
      name: 'Web Workers',
      logo: '/assets/images/gear-icon.png',
      type: 'file',
      parentFolderId: 0,
      initialPageConfig: WEB_WORKERS,
    },
    {
      name: 'New Trello',
      logo: '/assets/images/trello-icon.png',
      type: 'file',
      parentFolderId: 0,
      initialPageConfig: NEW_TRELLO,
    },
  ],
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

export const ALL_FILES: TBasicApp[] = [
  {
    name: 'Curriculum',
    logo: '/assets/images/pdf-icon.png',
    type: 'file',
    parentFolderId: ALL_FILES_FOLDER_ID,
    initialPageConfig: CURRICULUM_FOLDER,
  },
  {
    name: 'My Experience',
    logo: '/assets/images/person-icon.png',
    type: 'file',
    parentFolderId: ALL_FILES_FOLDER_ID,
    initialPageConfig: EXPERIENCE,
  },
  {
    name: 'About Me',
    logo: '/assets/images/about-me.png',
    type: 'file',
    parentFolderId: ALL_FILES_FOLDER_ID,
    initialPageConfig: ABOUT_ME,
  },
  {
    name: 'Get in touch',
    logo: '/assets/images/text-me.png',
    type: 'file',
    parentFolderId: ALL_FILES_FOLDER_ID,
    initialPageConfig: CONTACT_ME_FOLDER.config,
  },
  {
    name: 'Web Workers',
    logo: '/assets/images/gear-icon.png',
    type: 'file',
    parentFolderId: ALL_FILES_FOLDER_ID,
    initialPageConfig: WEB_WORKERS,
  },
  {
    name: 'New Trello',
    logo: '/assets/images/trello-icon.png',
    type: 'file',
    parentFolderId: ALL_FILES_FOLDER_ID,
    initialPageConfig: NEW_TRELLO,
  },
  {
    name: 'Recycle Bin',
    logo: '/assets/images/recycle-bin.png',
    type: 'folder',
    parentFolderId: ALL_FILES_FOLDER_ID,
    initialPageConfig: RECYCLE_FOLDER,
  },
];
