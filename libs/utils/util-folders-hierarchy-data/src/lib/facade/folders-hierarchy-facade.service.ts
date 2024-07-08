import { Injectable } from '@angular/core';
import { FoldersHierarchyDataService } from '../service/folders-hierarchy-data.service';

@Injectable({ providedIn: 'root' })
export class FoldersHierarchyFacade {
  constructor(
    private readonly foldersHierarchyDataService: FoldersHierarchyDataService
  ) {}

  findFolder(id: number) {
    return this.foldersHierarchyDataService.findFolder(id);
  }

  createFolder(title: string, parentId?: number) {
    return this.foldersHierarchyDataService.createNewFolder(title, parentId);
  }

  renameFolder(id: number, newTitle: string) {
    this.foldersHierarchyDataService.renameFolder(id, newTitle);
  }

  get allFolders$$() {
    return this.foldersHierarchyDataService.allFolders$$;
  }

  get allFolders() {
    return this.foldersHierarchyDataService.allFolders;
  }
}
