import { Injectable } from '@angular/core';
import { IFolder } from '@portifolio/utils/util-models';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FoldersHierarchyDataService {
  lastId = 0;
  private allFolders$ = new BehaviorSubject<IFolder[]>([]);

  createNewFolder(title: string, parentId?: number) {
    const newFolder: IFolder = {
      title,
      id: this.newId,
    };

    if (!parentId && parentId != 0) {
      this.allFolders.push(newFolder);
      return newFolder;
    }

    const folder = this.findFolder(parentId);

    if (!folder) return undefined;

    if (!folder.children) folder.children = [];
    folder.children.push(newFolder);

    return newFolder;
  }

  findFolder(
    id: number | string,
    folders = this.allFolders
  ): IFolder | undefined {
    let hasFolder: IFolder | undefined = undefined;

    for (let i = 0; i < folders.length; i++) {
      if (folders[i].id === id) hasFolder = folders[i];
    }

    if (hasFolder) return hasFolder;

    for (let i = 0; i < folders.length; i++) {
      if (folders[i].children) return this.findFolder(id, folders[i].children);
    }

    return hasFolder;
  }

  removeFolder(id: number, folders = this.allFolders): void {
    for (let i = 0; i < folders.length; i++) {
      if (folders[i].id === id) {
        const index = folders.findIndex((folder) => folder.id == id);
        folders.splice(index, 1);
        return;
      }
    }

    for (let i = 0; i < folders.length; i++) {
      if (folders[i].children)
        return this.removeFolder(id, folders[i].children);
    }

    return;
  }

  moveFolder(id: number, newFolderPlacement: number) {
    const folder = this.findFolder(id);

    if (!folder) return;

    this.removeFolder(id);

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

  get newId() {
    return ++this.lastId;
  }

  get allFolders$$() {
    return this.allFolders$.asObservable();
  }

  get allFolders() {
    return this.allFolders$.value;
  }
}
