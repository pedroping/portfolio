import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Inject,
  OnInit,
  Optional,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ContextMenuFacade,
  OpenContextMenuDirective,
} from '@portifolio/features/feature-context-menus';
import { AppCopyAndPasteFacade } from '@portifolio/utils/util-app-copy-and-paste';
import { AppDropHandleDirective } from '@portifolio/utils/util-app-drop-handle';
import { FolderHandleComponent } from '@portifolio/utils/util-folder-handle';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import {
  DATA_TOKEN,
  IApp,
  IFolderData,
  IOptionEvent,
} from '@portifolio/utils/util-models';
import { Observable, tap } from 'rxjs';
import { FILE_EXPLORER_ID } from '../../mocks/file-explorer-mocks';

@Component({
  selector: 'app-holder',
  templateUrl: './app-holder.component.html',
  styleUrls: ['./app-holder.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    FolderHandleComponent,
    AppDropHandleDirective,
    OpenContextMenuDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[id]': 'fileExplorerId + id()',
  },
})
export class AppHolderComponent implements OnInit {
  id = signal<number>(-1);
  files$$: Observable<IApp[]>;
  fileExplorerId = FILE_EXPLORER_ID;
  pasteEvent$: Observable<IOptionEvent<unknown>>;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly destroyRef: DestroyRef,
    private readonly appCopyAndPasteFacade: AppCopyAndPasteFacade,
    private readonly contextMenuFacade: ContextMenuFacade<unknown>,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
    @Optional() @Inject(DATA_TOKEN) private readonly data: IFolderData,
  ) {
    this.id.set(data?.folderId ?? 0);
    this.files$$ = this.foldersHierarchyFacade
      .getFileByFolder(this.id())
      .pipe(tap(() => this.cdr.detectChanges()));

    this.pasteEvent$ = this.contextMenuFacade.getEventByOption(
      'paste',
      this.fileExplorerId + this.id(),
    );
  }

  ngOnInit(): void {
    this.pasteEvent$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => this.handleCopyAndPaste(event));
  }

  handleCopyAndPaste(event: IOptionEvent<unknown>) {
    const copyAndPaste = this.appCopyAndPasteFacade.getActualEvent();
    console.log(event);

    if (!copyAndPaste.data && copyAndPaste.data != 0) return;

    copyAndPaste.event == 'copy'
      ? this.handleCopy(copyAndPaste.data)
      : this.handleCut(copyAndPaste.data);
  }

  handleCut(id: number) {
    const file = this.foldersHierarchyFacade.getFile(id);

    if (!file) return;

    if (file.parentFolderId == this.id() || file.isFolderId == this.id())
      return;

    if (file.isFolderId || file.isFolderId == 0) {
      const hasSameChild = this.foldersHierarchyFacade.hasSameChild(
        file.isFolderId,
        this.id(),
      );

      if (hasSameChild) return;

      this.foldersHierarchyFacade.changeFolderId(id, this.id());
      this.foldersHierarchyFacade.moveFolder(file.isFolderId, this.id());
    }

    this.foldersHierarchyFacade.changeFolderId(id, this.id());
  }

  handleCopy(id: number) {
    const file = this.foldersHierarchyFacade.getFile(id);

    if (!file) return;

    if (file.type == 'file') {
      const newFile = {
        ...file,
        pageConfigId: undefined,
        isFolderId: undefined,
        id: undefined,
        parentFolderId: this.id(),
      };

      this.foldersHierarchyFacade.setNewFile(newFile);

      return;
    }

    if (!file.isFolderId && file.isFolderId != 0) return;

    const oldFolder = this.foldersHierarchyFacade.findFolder(file.isFolderId);

    const newFolder = this.foldersHierarchyFacade.createFolder(
      file.name,
      this.id(),
    );

    if (!newFolder || !oldFolder?.children) return;
    
    for (let i = 0; i < oldFolder.children.length; i++) {
      const folder = oldFolder.children[i];
      this.setFilesNewFolder(newFolder.id, folder.id);
    }
  }

  setFilesNewFolder(folderId: number, oldFolderId: number) {
    const oldFolder = this.foldersHierarchyFacade.findFolder(oldFolderId);
    const oldFolderFiles =
      this.foldersHierarchyFacade.getFileByFolder(oldFolderId);

    if (!oldFolder || !oldFolderFiles) return;

    console.log(oldFolder, oldFolderFiles);
  }
}
