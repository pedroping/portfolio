import { IInitialConfig, TBasicApp } from '@portifolio/utils/util-models';

export const CURRICULUM_FOLDER: IInitialConfig = {
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
};

export const FILE_FOLDER = {
  name: 'File Explorer',
  customX: 500,
  customY: 500,
  baseSizes: { width: 600, height: 500, minHeight: 500, minWidth: 600 },
  pageContent: import('@portifolio/features/feature-file-explorer').then(
    (c) => c.FileExplorerComponent,
  ),
  opened: true,
  isFullScreen: false,
};

export const CONTACT_ME_FOLDER = {
  name: 'Contact me',
  customX: 500,
  customY: 500,
  baseSizes: { width: 500, height: 380, minHeight: 380, minWidth: 500 },
  pageContent: import('@portifolio/features/feature-get-in-touch').then(
    (c) => c.GetInTouchComponent,
  ),
  opened: true,
  isFullScreen: false,
};

export const EXPERIENCE: IInitialConfig = {
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
  pageContent: import('@portifolio/ui/ui-experience-page').then(
    (c) => c.UiExperienceComponent,
  ),
};

export const ABOUT_ME: IInitialConfig = {
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
  pageContent: import('@portifolio/ui/ui-about-me').then(
    (c) => c.AboutMePageComponent,
  ),
};

export const TRASH_FILE: TBasicApp = {
  name: 'Recycle Bin',
  logo: '/assets/images/recycle-bin.png',
  type: 'folder',
  parentFolderId: 0,
  initialPageConfig: FILE_FOLDER,
  preventFolderDelete: true,
};

export const BASIC_FOLDER: TBasicApp[] = [
  {
    name: 'Curriculum',
    logo: '/assets/images/pdf-icon.png',
    type: 'file',
    parentFolderId: 0,
    initialPageConfig: CURRICULUM_FOLDER,
  },
  {
    name: 'Get in touch',
    logo: '/assets/images/text-me.png',
    type: 'file',
    parentFolderId: 0,
    initialPageConfig: CONTACT_ME_FOLDER,
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
];
