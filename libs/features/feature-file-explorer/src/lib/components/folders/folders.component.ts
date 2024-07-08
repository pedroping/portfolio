import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FolderSectionActionDirective } from '../../directives/folder-section-action/folder-section-action.directive';
import { ShowHideFolderDirective } from '../../directives/show-hide-folder/show-hide-folder.directive';
import { FileExplorerFacade } from '../../facade/file-explorer-facade.service';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
@Component({
  selector: 'folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss'],
  standalone: true,
  imports: [
    NgTemplateOutlet,
    ShowHideFolderDirective,
    FolderSectionActionDirective,
    AsyncPipe,
  ],
})
export class FoldersComponent {
  allFolders$$ = this.foldersHierarchyFacade.allFolders$$;

  constructor(private readonly foldersHierarchyFacade: FoldersHierarchyFacade) {
    this.foldersHierarchyFacade.createFolder('Teste');

    console.log(this.foldersHierarchyFacade.allFolders);
  }
}
