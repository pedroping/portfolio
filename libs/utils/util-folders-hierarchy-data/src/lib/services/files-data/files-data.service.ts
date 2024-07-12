import { Injectable } from '@angular/core';
import { IApp, IBasicApp } from '@portifolio/utils/util-models';
import { BehaviorSubject, map, startWith } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FilesDataService {
  private allFiles$ = new BehaviorSubject<IApp[]>([]);

  setNewFile(file: IBasicApp): IApp {
    const newFileId = this.allFiles.length;

    const newFile = { ...file, id: newFileId };

    this.allFiles$.next([...this.allFiles, newFile]);

    return newFile;
  }

  getFileByFolder(folderId: number) {
    return this.allFiles$$.pipe(
      startWith(this.allFiles),
      map((files) => files.filter((file) => file.folderId === folderId)),
    );
  }

  getFile(id: number) {
    return this.allFiles.find((file) => file.id === id);
  }

  renameFile(id: number, newTitle: string) {
    const file = this.getFile(id);

    if (!file) return;

    file.name = newTitle;

    const files = this.allFiles;

    this.allFiles$.next([]);
    this.allFiles$.next(files);
  }

  changeFolderId(id: number, folderId: number) {
    const file = this.getFile(id);

    if (!file) return;

    file.folderId = folderId;

    const files = this.allFiles;

    this.allFiles$.next([]);
    this.allFiles$.next(files);
  }

  deleteFile(id: number) {
    const filteredFiles = this.allFiles.filter((file) => file.id != id);
    this.allFiles$.next(filteredFiles);
  }

  deleteFilesByFolder(folderId: number) {
    const filteredFiles = this.allFiles.filter(
      (file) => file.folderId != folderId,
    );
    this.allFiles$.next(filteredFiles);
  }

  get allFiles() {
    return this.allFiles$.value;
  }

  get allFiles$$() {
    return this.allFiles$.asObservable();
  }
}
