import { Injectable } from '@angular/core';
import { IPageConfig } from '@portifolio/utils/util-models';
import { CreateFilesAndFoldersService } from '../services/create-files-and-folders/create-files-and-folders.service';
import { FoldersViewStateService } from '../services/folders-view-state/folders-view-state.service';

@Injectable({ providedIn: 'root' })
export class FileExplorerFacade {
  constructor(
    private readonly foldersStateService: FoldersViewStateService,
    private readonly createFolderPageService: CreateFilesAndFoldersService,
  ) {}

  setState(val: boolean) {
    this.foldersStateService.setState(val);
  }

  toggleState() {
    this.foldersStateService.toggleState();
  }

  get menuState$$() {
    return this.foldersStateService.menuState$$;
  }

  get menuState() {
    return this.foldersStateService.menuState;
  }

  createFolder(
    folderId: number,
    folderTitle: string,
    actualFolderId: number,
    pageConfig?: IPageConfig,
  ) {
    this.createFolderPageService.createFolder(
      folderId,
      folderTitle,
      actualFolderId,
      pageConfig,
    );
  }

  createFile(name: string, parentFolderId: number) {
    this.createFolderPageService.createFile(name, parentFolderId);
  }
}
