import { Injectable } from '@angular/core';
import { FilesDataService } from '../services/files-data/files-data.service';
import { FoldersHierarchyDataService } from '../services/folders-hierarchy-data/folders-hierarchy-data.service';
import { IApp } from '@portifolio/utils/util-models';

@Injectable({ providedIn: 'root' })
export class FoldersHierarchyFacade {
  constructor(
    private readonly filesDataService: FilesDataService,
    private readonly foldersHierarchyDataService: FoldersHierarchyDataService
  ) {}

  findFolder(id: number) {
    return this.foldersHierarchyDataService.findFolder(id);
  }

  createFolder(title: string, parentId?: number) {
    return this.foldersHierarchyDataService.createNewFolder(title, parentId);
  }

  renameFolder(id: number | string, newTitle: string) {
    this.foldersHierarchyDataService.renameFolder(id, newTitle);
  }

  renameFile(id: number, newTitle: string) {
    this.filesDataService.renameFile(id, newTitle);
  }

  setNewFile(file: Omit<IApp, 'id' | 'parentTargetId'>): IApp {
    return this.filesDataService.setNewFile(file);
  }

  changeFolderId(id: number, folderId: number) {
    this.filesDataService.changeFolderId(id, folderId);
  }

  moveFolder(id: number, newFolderPlacement: number) {
    this.foldersHierarchyDataService.moveFolder(id, newFolderPlacement);
  }

  getFileByFolder(folderId: number) {
    return this.filesDataService.getFileByFolder(folderId);
  }

  get allFiles() {
    return this.filesDataService.allFiles;
  }

  get allFiles$$() {
    return this.filesDataService.allFiles$$;
  }

  get allFolders$$() {
    return this.foldersHierarchyDataService.allFolders$$;
  }

  get allFolders() {
    return this.foldersHierarchyDataService.allFolders;
  }
}
