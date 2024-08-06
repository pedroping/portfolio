import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FoldersViewStateService {
  private folderState$ = new BehaviorSubject<boolean>(true);
  private adressState$ = new BehaviorSubject<boolean>(true);

  setAdressState(val: boolean) {
    this.adressState$.next(val);
  }

  toggleAdressState() {
    this.adressState$.next(!this.adressState);
  }

  get adressState$$() {
    return this.adressState$.asObservable();
  }

  get adressState() {
    return this.adressState$.value;
  }

  setFolderState(val: boolean) {
    this.folderState$.next(val);
  }

  toggleFolderState() {
    this.folderState$.next(!this.folderState);
  }

  get folderState$$() {
    return this.folderState$.asObservable();
  }

  get folderState() {
    return this.folderState$.value;
  }
}
