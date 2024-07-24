import { IInitialConfig } from '@portifolio/utils/util-models';
import { FileExplorerComponent } from '@portifolio/features/feature-file-explorer';

export const FOLDER_MOCK: IInitialConfig = {
  name: 'File Explorer',
  customX: 0,
  customY: 0,
  baseSizes: { width: 600, height: 500, minHeight: 500, minWidth: 600 },
  pageContent: FileExplorerComponent,
  opened: true,
  isFullScreen: false,
};
