import { Injectable } from '@angular/core';
import { IApp, IFolder } from '@portifolio/utils/util-models';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FoldersHierarchyDataService {
  lastId = 1;
  private allFolders$ = new BehaviorSubject<IFolder[]>([]);

  findFolder(id: number, folders = this.allFolders): IFolder | undefined {
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

  renameFolder(id: number, newTitle: string) {
    const folder = this.findFolder(id);

    if (!folder) return;

    folder.title = newTitle;

    this.allFolders$.next(this.allFolders);
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
