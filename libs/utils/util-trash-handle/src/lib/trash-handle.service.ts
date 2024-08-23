import { Injectable } from '@angular/core';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';

@Injectable({ providedIn: 'root' })
export class TrashHandle {
  private trashFileId = -1;
  private trashFolderId = -1;

  constructor(
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
  ) {}

  get id() {
    return this.trashFileId;
  }

  get folderId() {
    const file = this.getTrashFile();
    return file?.isFolderId ?? this.trashFolderId;
  }

  setFileId(id: number) {
    this.trashFileId = id;
  }

  setFolderId(id: number) {
    this.trashFolderId = id;
  }

  getTrashFile() {
    return this.foldersHierarchyFacade.getFile(this.trashFileId);
  }

  getTrashFolder() {
    const file = this.getTrashFile();
    return this.foldersHierarchyFacade.findFolder(
      file?.isFolderId ?? this.trashFolderId,
    );
  }
}
