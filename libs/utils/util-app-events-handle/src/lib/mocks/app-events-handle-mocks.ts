import { IInitialConfig } from '@portifolio/utils/util-models';

export const FOLDER_MOCK: IInitialConfig = {
  name: 'File Explorer',
  customX: 0,
  customY: 0,
  icon: '/assets/images/my-computer-folder-icon.png',
  baseSizes: { width: 600, height: 500, minHeight: 500, minWidth: 600 },
  pageContent: () =>
    import('@portifolio/features/feature-file-explorer').then(
      (c) => c.FileExplorerComponent,
    ),
  opened: true,
  isFullScreen: false,
};
