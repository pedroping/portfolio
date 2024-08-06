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

  setAdressState(val: boolean) {
    this.foldersStateService.setAdressState(val);
  }

  toggleAdressState() {
    this.foldersStateService.toggleAdressState();
  }

  get adressState$$() {
    return this.foldersStateService.adressState$$;
  }

  get adressState() {
    return this.foldersStateService.adressState;
  }

  setFolderState(val: boolean) {
    this.foldersStateService.setFolderState(val);
  }

  toggleFolderState() {
    this.foldersStateService.toggleFolderState();
  }

  get folderState$$() {
    return this.foldersStateService.folderState$$;
  }

  get folderState() {
    return this.foldersStateService.folderState;
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
