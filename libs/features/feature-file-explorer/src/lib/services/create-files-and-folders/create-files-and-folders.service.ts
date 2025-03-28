import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ElementsFacade } from '@portifolio/features/feature-page-creator';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import {
  IApp,
  IFolder,
  IFolderData,
  IPageConfig,
} from '@portifolio/utils/util-models';
import { take } from 'rxjs';
import { FOLDER_MOCK, NEW_PAGE_GAP } from '../../mocks/file-explorer-mocks';

@Injectable({ providedIn: 'root' })
export class CreateFilesAndFoldersService {
  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly elementsFacade: ElementsFacade<IFolderData>,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
  ) {}

  createFolder(
    folder: IFolder,
    actualFolderId: number,
    pageConfig?: IPageConfig,
  ) {
    if (folder.id === actualFolderId) return;

    const newPageConfig = FOLDER_MOCK;

    newPageConfig.name = folder.title;
    newPageConfig.icon = folder.logo;

    if (pageConfig) {
      newPageConfig.customX = pageConfig.lastPosition.x + NEW_PAGE_GAP;
      newPageConfig.customY = pageConfig.lastPosition.y + NEW_PAGE_GAP;
    }

    const file = this.foldersHierarchyFacade.getFolderFile(folder.id);

    const generatedConfig = this.elementsFacade.createElement(
      { folderId: folder.id },
      newPageConfig,
    );

    if (file) {
      file.pageConfigId = generatedConfig.id;
      this.createPageEvents(file);
    }
  }

  createPageEvents(file: IApp) {
    const pageConfigId = file.pageConfigId;

    if (!pageConfigId && pageConfigId != 0) return;

    const pageConfig = this.elementsFacade.getElement(pageConfigId);

    if (!pageConfig) return;

    pageConfig.onDestroy$
      .pipe(takeUntilDestroyed(this.destroyRef), take(1))
      .subscribe(() => {
        file.pageConfigId = undefined;
      });
  }

  createFile(name: string, parentFolderId: number) {
    const newPageConfig = FOLDER_MOCK;

    newPageConfig.name = name;

    const newFile: Omit<IApp, 'id' | 'parentTargetId'> = {
      name: name,
      parentFolderId: parentFolderId,
      logo: '',
      type: 'folder',
      initialPageConfig: newPageConfig,
    };

    this.foldersHierarchyFacade.setNewFile(newFile);
  }
}
