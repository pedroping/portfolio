import { Injectable } from '@angular/core';
import { FoldersViewStateService } from '../services/folders-view-state/folders-view-state.service';

@Injectable({ providedIn: 'root' })
export class FileExplorerFacade {
  constructor(private readonly foldersStateService: FoldersViewStateService) {}

  setState(val: boolean) {
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
