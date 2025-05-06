import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Inject,
  OnInit,
  Optional,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
export class FoldersComponent implements OnInit {
  id: number;
  desktopIcon = DESKTOP_ICON;
  allFolders$$ = this.foldersHierarchyFacade.allFolders$$;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly destroyRef: DestroyRef,
    private readonly fileExplorerFacade: FileExplorerFacade,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
    @Optional() @Inject(DATA_TOKEN) private readonly data: IFolderData,
    @Optional() @Inject(CONFIG_TOKEN) private readonly pageConfig: IPageConfig,
  ) {
    this.id = data?.folderId ?? 0;
  }

  ngOnInit(): void {
    this.allFolders$$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
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
