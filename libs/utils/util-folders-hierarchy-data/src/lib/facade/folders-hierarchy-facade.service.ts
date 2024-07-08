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
    this.foldersHierarchyDataService.createNewFolder(title, parentId);
  }

  get allFolders$$() {
    return this.foldersHierarchyDataService.allFolders$$;
  }

  get allFolders() {
    return this.foldersHierarchyDataService.allFolders;
  }
}
