import { FileExplorerComponent } from '@portifolio/features/feature-file-explorer';
import { IBasicApp } from '@portifolio/utils/util-models';

export const BASIC_FOLDER: IBasicApp[] = [
  {
    name: 'Page 01',
    logo: '',
    type: 'folder',
    folderId: 0,
  },
  {
    name: 'Curriculum',
    logo: '/assets/images/pdf-icon.png',
    type: 'file',
    folderId: 0,
  },
  {
    name: 'Page 02',
    logo: '',
    type: 'folder',
    folderId: 0,
  },
];

export const FOLDER_01 = {
  name: 'File Explorer',
  customX: 500,
  customY: 500,
  baseSizes: { width: 600, height: 500, minHeight: 500, minWidth: 600 },
  pageContent: FileExplorerComponent,
  opened: true,
  isFullScreen: false,
};

export const FOLDER_02 = {
  name: 'Explorador de arquivos 2',
  customX: 200,
  customY: 200,
  baseSizes: { width: 600, height: 500, minHeight: 500, minWidth: 600 },
  pageContent: FileExplorerComponent,
  opened: true,
  isFullScreen: false,
};
