import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  ICopyAndPaste,
  ICopyAndPasteEvent,
} from '../models/app-copy-and-paste-models';
import { IApp } from '@portifolio/utils/util-models';

@Injectable({ providedIn: 'root' })
export class AppCopyAndPasteService {
  private copyData$ = new BehaviorSubject<number | undefined>(undefined);
  private cutData$ = new BehaviorSubject<number | undefined>(undefined);

  lastSelected: ICopyAndPaste = 'copy';
  selectedFolder = 0;
  selectedIcon?: IApp;

  setCopyEvent(id: number) {
    this.copyData$.next(id);
    this.lastSelected = 'copy';
    this.cutData$.next(undefined);
  }

  setCutEvent(id: number) {
    this.cutData$.next(id);
    this.lastSelected = 'cut';
    this.copyData$.next(undefined);
  }

  setSelectedFolder(id: number) {
    this.selectedFolder = id;
  }

  setSelectedIcon(icon?: IApp) {
    this.selectedIcon = icon;
  }

  clearEvents() {
    this.copyData$.next(undefined);
    this.cutData$.next(undefined);
  }

  get copyData$$() {
    return this.copyData$.asObservable();
  }

  get cutData$$() {
    return this.cutData$.asObservable();
  }

  getActualEvent(): ICopyAndPasteEvent {
    return {
      event: this.lastSelected,
      data: this.copyData$.value ?? this.cutData$.value,
    };
  }
}
