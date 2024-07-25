import { Injectable } from '@angular/core';
import { IFolder, IFolderData } from '@portifolio/utils/util-models';
import { BehaviorSubject } from 'rxjs';
import { FilesDataService } from '../files-data/files-data.service';
import { ElementsFacade } from '@portifolio/features/feature-page-creator';

@Injectable({ providedIn: 'root' })
export class FoldersHierarchyDataService {
  lastId = 0;
  private allFolders$ = new BehaviorSubject<IFolder[]>([]);

  constructor(
    private readonly filesDataService: FilesDataService,
    private readonly elementsFacade: ElementsFacade<IFolderData>,
  ) {}

  createNewFolder(title: string, parentId?: number) {
    const newFolder: IFolder = {
      title,
      id: this.newId,
    };

    if (!parentId && parentId != 0) {
      this.allFolders.push(newFolder);
      this.allFolders$.next(this.allFolders);
      return newFolder;
    }

    const folder = this.findFolder(parentId);

    if (!folder) return undefined;

    if (!folder.children) folder.children = [];
    folder.children.push(newFolder);

    this.allFolders$.next(this.allFolders);
    return newFolder;
  }

  findFolder(
    id: number | string,
    folders = this.allFolders,
  ): IFolder | undefined {
    for (let i = 0; i < folders.length; i++) {
      if (folders[i].id === id) return folders[i];
    }

    for (let i = 0; i < folders.length; i++) {
      if (folders[i].children) return this.findFolder(id, folders[i].children);
    }

    return undefined;
  }

  deleteFolder(
    id: number,
    folders = this.allFolders,
    preventChildDelete?: boolean,
  ): void {
    for (let i = 0; i < folders.length; i++) {
      if (folders[i].id === id) {
        const index = folders.findIndex((folder) => folder.id == id);
        const folder = folders.find((folder) => folder.id == id);

        if (folder && !preventChildDelete) this.deleteFolderChildrens(folder);

        folders.splice(index, 1);
        return;
      }
    }

    for (let i = 0; i < folders.length; i++) {
      if (folders[i].children)
        return this.deleteFolder(id, folders[i].children, preventChildDelete);
    }

    return;
  }

  deleteFolderChildrens(folder: IFolder) {
    const folderId = folder.id;

    const folderFile = this.filesDataService.getFolderFile(folderId);
    const pageConfigId = folderFile?.pageConfigId;

    if (pageConfigId || pageConfigId == 0)
      this.elementsFacade.destroyElement(pageConfigId);

    this.filesDataService.deleteFilesByFolder(folderId);

    if (!folder.children) return;

    for (let i = 0; i < folder.children.length; i++) {
      this.deleteFolderChildrens(folder.children[i]);
    }
  }

  moveFolder(id: number, newFolderPlacement: number) {
    const folder = this.findFolder(id);

    if (!folder) return;

    this.deleteFolder(id, undefined, true);

    if (newFolderPlacement == 0) {
      this.allFolders.push(folder);
      this.allFolders$.next(this.allFolders);
      return;
    }

    const newFolderPlace = this.findFolder(newFolderPlacement);

    if (!newFolderPlace) return;

    if (!newFolderPlace.children) newFolderPlace.children = [];

    newFolderPlace.children.push(folder);

    this.allFolders$.next(this.allFolders);
  }

  hasSameChild(id: number, newFolderPlacement: number) {
    const folder = this.findFolder(id);

    if (!folder || !folder.children) return false;

    const hasChild = this.findFolder(newFolderPlacement, folder.children);

    return !!hasChild;
  }

  renameFolder(id: number | string, newTitle: string) {
    const folder = this.findFolder(id);

    if (!folder) return;

    folder.title = newTitle;
    const allFolders = this.allFolders;

    this.allFolders$.next([]);
    this.allFolders$.next(allFolders);
  }

  resetData() {
    this.allFolders$.next([]);
  }

  get newId() {
    return ++this.lastId;
  }

  get allFolders() {
    return this.allFolders$.value;
  }

  get allFolders$$() {
    return this.allFolders$.asObservable();
  }
}
