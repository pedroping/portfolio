import { Injectable } from '@angular/core';
import { ElementsFacade } from '@portifolio/features/feature-page-creator';
import { IFolderData, IPageConfig } from '@portifolio/utils/util-models';
import { FOLDER_MOCK, NEW_PAGE_GAP } from '../../mocks/file-explorer-mocks';
import { FileExplorerComponent } from '../../ui/file-explorer.component';

@Injectable({ providedIn: 'root' })
export class CreateFolderPageService {
  constructor(private readonly elementsFacade: ElementsFacade<IFolderData>) {}

  createFolder(
    folderId: number,
    folderTitle: string,
    actualFolderId: number,
    pageConfig?: IPageConfig,
  ) {
    if (folderId === actualFolderId) return;

    const newPageConfig = FOLDER_MOCK;

    newPageConfig.name = folderTitle;
    newPageConfig.pageContent = FileExplorerComponent;

    if (pageConfig) {
      newPageConfig.customX = pageConfig.lastPosition.x + NEW_PAGE_GAP;
      newPageConfig.customY = pageConfig.lastPosition.y + NEW_PAGE_GAP;
    }

    this.elementsFacade.createElement({ folderId: folderId }, newPageConfig);
  }
}
