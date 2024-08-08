import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, Optional } from '@angular/core';
import { HEIGHT_ANIMATION } from '@portifolio/utils/util-animations';
import { AppDropHandleDirective } from '@portifolio/utils/util-app-drop-handle';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import {
  CONFIG_TOKEN,
  DATA_TOKEN,
  IFolder,
  IFolderData,
  IPageConfig,
} from '@portifolio/utils/util-models';
import { tap } from 'rxjs';
import { SectionActionDirective } from '../../directives/section-action/section-action.directive';
import { ShowHideFolderDirective } from '../../directives/show-hide-folder/show-hide-folder.directive';
import { FileExplorerFacade } from '../../facade/file-explorer-facade.service';
import { DESKTOP_ICON } from '../../mocks/file-explorer-mocks';
@Component({
  selector: 'folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    NgTemplateOutlet,
    AppDropHandleDirective,
    ShowHideFolderDirective,
    SectionActionDirective,
  ],
  animations: [HEIGHT_ANIMATION],
})
export class FoldersComponent {
  id: number;
  desktopIcon = DESKTOP_ICON;
  allFolders$$ = this.foldersHierarchyFacade.allFolders$$.pipe(
    tap(() => this.cdr.detectChanges()),
  );

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly fileExplorerFacade: FileExplorerFacade,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
    @Optional() @Inject(DATA_TOKEN) private readonly data: IFolderData,
    @Optional() @Inject(CONFIG_TOKEN) private readonly pageConfig: IPageConfig,
  ) {
    this.id = data?.folderId ?? 0;
  }

  openDesktopFolder() {
    this.fileExplorerFacade.createFolder(
      { id: 0, title: 'Desktop', logo: this.desktopIcon },
      this.data.folderId,
    );
  }

  openFolder(folder: IFolder) {
    this.fileExplorerFacade.createFolder(
      folder,
      this.data.folderId,
      this.pageConfig,
    );
  }
}
