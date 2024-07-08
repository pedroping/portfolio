import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFolder } from '../../models/folders-models';

@Injectable({ providedIn: 'root' })
export class FoldersDataService {
  lastId = 0;
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
      return;
    }

    const folder = this.findFolder(parentId);

    if (!folder) return;

    if (!folder.children) {
      folder.children = [newFolder];
      return;
    }

    folder.children.push(newFolder);
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
