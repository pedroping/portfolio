import { Injectable } from '@angular/core';
import { ElementsFacade } from '@portifolio/features/feature-page-creator';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import {
  IApp,
  IFolderData,
  IInitialConfig,
  IPageConfig,
} from '@portifolio/utils/util-models';
import { FOLDER_MOCK, NEW_PAGE_GAP } from '../../mocks/file-explorer-mocks';

@Injectable({ providedIn: 'root' })
export class CreateFilesAndFoldersService {
  constructor(
    private readonly elementsFacade: ElementsFacade<IFolderData>,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
  ) {}

  createFolder(
    folderId: number,
    folderTitle: string,
    actualFolderId: number,
    pageConfig?: IPageConfig,
  ) {
    if (folderId === actualFolderId) return;

    import('../../ui/file-explorer.component').then((component) => {
      const newPageConfig = FOLDER_MOCK;

      newPageConfig.name = folderTitle;
      newPageConfig.pageContent = component.FileExplorerComponent;

      if (pageConfig) {
        newPageConfig.customX = pageConfig.lastPosition.x + NEW_PAGE_GAP;
        newPageConfig.customY = pageConfig.lastPosition.y + NEW_PAGE_GAP;
      }

      this.elementsFacade.createElement({ folderId: folderId }, newPageConfig);
    });
  }

  createFile(name: string, parentFolderId: number) {
    import('../../ui/file-explorer.component').then((component) => {
      const config: IInitialConfig = {
        name: 'File Explorer',
        customX: 0,
        customY: 0,
        baseSizes: { width: 600, height: 500, minHeight: 500, minWidth: 600 },
        pageContent: component.FileExplorerComponent,
        opened: true,
        isFullScreen: false,
      };

      const newFile: Omit<IApp, 'id' | 'parentTargetId'> = {
        name: name,
        parentFolderId: parentFolderId,
        logo: '',
        type: 'folder',
        initialPageConfig: config,
      };

      this.foldersHierarchyFacade.setNewFile(newFile);
    });
  }
}
