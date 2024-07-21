import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import {
  CONFIG_TOKEN,
  DATA_TOKEN,
  IFolder,
  IFolderData,
  IPageConfig,
} from '@portifolio/utils/util-models';
import { FolderSectionActionDirective } from '../../directives/folder-section-action/folder-section-action.directive';
import { ShowHideFolderDirective } from '../../directives/show-hide-folder/show-hide-folder.directive';
import { FileExplorerFacade } from '../../facade/file-explorer-facade.service';
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
    private readonly fileExplorerFacade: FileExplorerFacade,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
    @Optional() @Inject(DATA_TOKEN) private readonly data: IFolderData,
    @Optional() @Inject(CONFIG_TOKEN) private readonly pageConfig: IPageConfig,
  ) {
    this.id = data?.folderId ?? 0;
  }

  openDesktopFolder() {
    this.fileExplorerFacade.createFolder(0, 'Desktop', this.data.folderId);
  }

  openFolder(folder: IFolder) {
    this.fileExplorerFacade.createFolder(
      folder.id,
      folder.title,
      this.data.folderId,
    );
  }
}
