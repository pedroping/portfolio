import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Optional,
  signal,
} from '@angular/core';
import { OpenContextMenuDirective } from '@portifolio/features/feature-context-menus';
import { AppDropHandleDirective } from '@portifolio/utils/util-app-drop-handle';
import { FolderHandleComponent } from '@portifolio/utils/util-folder-handle';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { DATA_TOKEN, IApp, IFolderData } from '@portifolio/utils/util-models';
import { Observable, tap } from 'rxjs';
import { FILE_EXPLORER_ID } from '../../mocks/file-explorer-mocks';

@Component({
  selector: 'app-holder',
  templateUrl: './app-holder.component.html',
  styleUrls: ['./app-holder.component.scss'],
  standalone: true,
  imports: [
    AppDropHandleDirective,
    AsyncPipe,
    FolderHandleComponent,
    OpenContextMenuDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHolderComponent {
  id = signal<number>(-1);
  files$$: Observable<IApp[]>;
  fileExplorerId = FILE_EXPLORER_ID;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
    @Optional() @Inject(DATA_TOKEN) private readonly data: IFolderData,
  ) {
    this.id.set(data?.folderId ?? 0);
    this.files$$ = this.foldersHierarchyFacade
      .getFileByFolder(this.id())
      .pipe(tap(() => this.cdr.detectChanges()));
  }
}
