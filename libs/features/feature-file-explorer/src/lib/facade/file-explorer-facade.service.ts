import { Injectable } from '@angular/core';
import { FoldersStateService } from '../services/folders-state/folders-state.service';

@Injectable({ providedIn: 'root' })
export class FileExplorerFacade {
  constructor(private readonly foldersStateService: FoldersStateService) {}

  setState(val: Boolean) {
    this.foldersStateService.setState(val);
  }

  toggleState() {
    this.foldersStateService.toggleState();
  }

  get menuState$$() {
    return this.foldersStateService.menuState$$;
  }

  get menuState() {
    return this.foldersStateService.menuState;
  }
}
