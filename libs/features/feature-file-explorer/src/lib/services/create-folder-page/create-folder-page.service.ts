import { Injectable } from '@angular/core';
import { ElementsFacade } from '@portifolio/features/feature-page-creator';
import {
    IFolderData,
    IPageConfig
} from '@portifolio/utils/util-models';
import { FOLDER_MOCK } from '../../mocks/file-explorer-mocks';

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

    if (pageConfig) {
      newPageConfig.customX = pageConfig.lastPosition.x;
      newPageConfig.customY = pageConfig.lastPosition.y;
    }

    this.elementsFacade.createElement({ folderId: folderId }, newPageConfig);
  }
}
