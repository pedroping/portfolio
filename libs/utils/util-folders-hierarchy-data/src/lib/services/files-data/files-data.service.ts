import { Injectable } from '@angular/core';
import { IApp, IBasicApp } from '@portifolio/utils/util-models';
import { BehaviorSubject, filter, map, startWith } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FilesDataService {
  private allFiles$ = new BehaviorSubject<IApp[]>([]);

  setNewFile(file: IBasicApp) {
    const newFileId = this.allFiles.length;

    const newFile = { ...file, id: newFileId };

    this.allFiles$.next([...this.allFiles, newFile]);
  }

  getFileByFolder(folderId: number) {
    return this.allFiles$$.pipe(
      startWith(this.allFiles),
      map((files) => files.filter((file) => file.folderId === folderId))
    );
  }

  get allFiles() {
    return this.allFiles$.value;
  }

  get allFiles$$() {
    return this.allFiles$.asObservable();
  }
}
