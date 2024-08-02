import { FileExplorerComponent } from '@portifolio/features/feature-file-explorer';
import { CurriculumPageComponent } from '@portifolio/ui/ui-curriculum-page';
import { IBasicApp, IInitialConfig } from '@portifolio/utils/util-models';

export const FOLDER_01: IInitialConfig = {
  name: 'File Explorer',
  customX: 500,
  customY: 500,
  baseSizes: { width: 600, height: 500, minHeight: 500, minWidth: 600 },
  pageContent: FileExplorerComponent,
  opened: true,
  isFullScreen: false,
};

export const FOLDER_02: IInitialConfig = {
  name: 'Desktop',
  customX: 200,
  customY: 200,
  baseSizes: { width: 600, height: 500, minHeight: 500, minWidth: 600 },
  pageContent: FileExplorerComponent,
  opened: true,
  isFullScreen: false,
};

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
  pageContent: CurriculumPageComponent,
  icon: '/assets/images/pdf-icon.png',
  opened: true,
};

export const BASIC_FOLDER: IBasicApp[] = [
  {
    name: 'Page 01',
    logo: '',
    type: 'folder',
    parentFolderId: 0,
    initialPageConfig: FOLDER_01,
  },
  {
    name: 'Curriculum',
    logo: '/assets/images/pdf-icon.png',
    type: 'file',
    parentFolderId: 0,
    initialPageConfig: CURRICULUM_FOLDER,
  },
  {
    name: 'Page 02',
    logo: '',
    type: 'folder',
    parentFolderId: 0,
    initialPageConfig: FOLDER_02,
  },
];
