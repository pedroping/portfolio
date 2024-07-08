import { Injectable } from '@angular/core';
import { FoldersViewStateService } from '../services/folders-view-state/folders-view-state.service';
import { FoldersDataService } from '../services/folders-data/folders-data.service';

@Injectable({ providedIn: 'root' })
export class FileExplorerFacade {
  constructor(
    private readonly foldersDataService: FoldersDataService,
    private readonly foldersStateService: FoldersViewStateService
  ) {}

  setState(val: boolean) {
    this.foldersStateService.setState(val);
  }

  toggleState() {
    this.foldersStateService.toggleState();
  }

  findFolder(id: number) {
    return this.foldersDataService.findFolder(id);
  }

  createFolder(title: string, parentId?: number) {
    this.foldersDataService.createNewFolder(title, parentId);
  }

  get menuState$$() {
    return this.foldersStateService.menuState$$;
  }

  get menuState() {
    return this.foldersStateService.menuState;
  }

  get allFolders$$() {
    return this.foldersDataService.allFolders$$;
  }

  get allFolders() {
    return this.foldersDataService.allFolders;
  }
}
