import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { FolderSectionActionDirective } from '../../directives/folder-section-action/folder-section-action.directive';
import { ShowHideFolderDirective } from '../../directives/show-hide-folder/show-hide-folder.directive';
import { DATA_TOKEN, IFolderData } from '@portifolio/utils/util-models';
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
  id: number;
  allFolders$$ = this.foldersHierarchyFacade.allFolders$$;

  constructor(
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
    @Optional() @Inject(DATA_TOKEN) private readonly data: IFolderData
  ) {
    this.id = data?.folderId ?? 0;
  }
}
