import { Injectable } from '@angular/core';
import {
  EXPLITED_ADRESS_01,
  EXPLITED_ADRESS_02,
  IFolder,
  IFolderData,
  INITIAL_FOLDER_ADRESS,
} from '@portifolio/utils/util-models';
import { BehaviorSubject } from 'rxjs';
import { FilesDataService } from '../files-data/files-data.service';
import { ElementsFacade } from '@portifolio/features/feature-page-creator';
import { DEFAULT_FOLDER_LOGO } from '../../mocks/folder-mocks';

@Injectable({ providedIn: 'root' })
export class FoldersHierarchyDataService {
  lastId = 0;
  private allFolders$ = new BehaviorSubject<IFolder[]>([]);

  constructor(
    private readonly filesDataService: FilesDataService,
    private readonly elementsFacade: ElementsFacade<IFolderData>,
  ) {}

  createNewFolder(
    title: string,
    logo = DEFAULT_FOLDER_LOGO,
    parentId?: number,
  ) {
    const newFolder: IFolder = {
      title,
      id: this.newId,
      logo,
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
    let folder: IFolder | undefined = undefined;

    for (let i = 0; i < folders.length; i++) {
      if (folders[i].id === id) {
        folder = folders[i];
      }
    }

    if (folder) return folder;

    for (let i = 0; i < folders.length; i++) {
      if (folders[i]?.children) {
        const findedFolder = this.findFolder(id, folders[i]?.children);
        if (findedFolder) folder = findedFolder;
      }
    }

    return folder;
  }

  getFolderAdress(folderId: number) {
    let folderFile = this.filesDataService.getFolderFile(folderId);

    let searchAdress = '';

    if (folderFile?.name) searchAdress = '/' + folderFile?.name;

    while (folderFile && folderFile?.parentFolderId != 0) {
      if (folderFile) {
        folderFile = this.filesDataService.getFolderFile(
          folderFile?.parentFolderId,
        );
        searchAdress = '/' + folderFile?.name + searchAdress;
      }
    }

    searchAdress = 'C:/Desktop' + searchAdress;

    return searchAdress;
  }

  findFolderByAdress(adress: string) {
    if (!adress) return null;

    if (adress.trim() == INITIAL_FOLDER_ADRESS) return 0;

    const allFolderNames = adress
      .split('/')
      .filter(
        (element) =>
          !element.includes(EXPLITED_ADRESS_01) &&
          !element.includes(EXPLITED_ADRESS_02),
      );

    if (allFolderNames.length == 1) {
      const folder = this.allFolders$.value.find(
        (folder) => folder.title == allFolderNames[0],
      );

      return folder?.id ?? null;
    }

    let folder: IFolder | undefined;

    allFolderNames.forEach((name) => {
      const currentFolders = folder?.children
        ? folder.children
        : this.allFolders$.value;

      folder = currentFolders.find((folder) => folder.title == name);
    });

    return folder ? folder.id : null;
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
