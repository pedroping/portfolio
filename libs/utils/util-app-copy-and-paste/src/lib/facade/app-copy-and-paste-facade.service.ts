import { Injectable } from '@angular/core';
import { AppCopyAndPasteService } from '../service/app-copy-and-paste.service';

@Injectable({ providedIn: 'root' })
export class AppCopyAndPasteFacade {
  constructor(
    private readonly appCopyAndPasteService: AppCopyAndPasteService,
  ) {}

  setCopyEvent(id: number) {
    this.appCopyAndPasteService.setCopyEvent(id);
  }

  setCutEvent(id: number) {
    this.appCopyAndPasteService.setCutEvent(id);
  }

  get copyData$$() {
    return this.appCopyAndPasteService.copyData$$;
  }

  get cutData$$() {
    return this.appCopyAndPasteService.cutData$$;
  }

  get selectedFolder() {
    return this.appCopyAndPasteService.selectedFolder;
  }

  getActualEvent() {
    return this.appCopyAndPasteService.getActualEvent();
  }

  setSelectedFolder(id: number) {
    this.appCopyAndPasteService.setSelectedFolder(id);
  }
}
