import { IInitialConfig } from '@portifolio/utils/util-models';

export const FILE_EXPLORER_ID = 'file-explorer-';

export const DESKTOP_ID = 0;
export const DESKTOP_ICON = '/assets/images/my-computer-folder-icon.png';

export const NEW_PAGE_GAP = 20;

export const FOLDER_MOCK: IInitialConfig = {
  name: 'File Explorer',
  customX: 0,
  customY: 0,
  baseSizes: { width: 600, height: 500, minHeight: 500, minWidth: 600 },
  pageContent: () => import('../ui/file-explorer.component').then(
    (c) => c.FileExplorerComponent,
  ),
  opened: true,
  isFullScreen: false,
};
