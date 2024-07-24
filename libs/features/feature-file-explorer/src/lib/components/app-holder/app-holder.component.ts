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
  IFolder,
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
      .getFileByFolder$(this.id())
      .pipe(tap(() => this.cdr.detectChanges()));

    this.pasteEvent$ = this.contextMenuFacade.getEventByOption(
      'paste',
      this.fileExplorerId + this.id(),
    );
  }

  ngOnInit(): void {
    this.pasteEvent$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.handleCopyAndPaste());
  }

  handleCopyAndPaste() {
    const copyAndPaste = this.appCopyAndPasteFacade.getActualEvent();

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

    const newFile = {
      ...file,
      pageConfigId: undefined,
      isFolderId: newFolder?.id,
      id: undefined,
      parentFolderId: this.id(),
    };

    if (
      !newFolder ||
      (!oldFolder?.id && oldFolder?.id != 0)
    )
      return;

    this.copyAllThings(oldFolder?.id, newFolder);
    this.foldersHierarchyFacade.setNewFile(newFile);
  }

  copyAllThings(
    oldFolderId: number,
    actualFolder: IFolder,
  ) {
    const files = this.foldersHierarchyFacade.getFileByFolder(oldFolderId);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type == 'file') {
        const newFile = {
          ...file,
          pageConfigId: undefined,
          isFolderId: undefined,
          id: undefined,
          parentFolderId: actualFolder?.id,
        };
        this.foldersHierarchyFacade.setNewFile(newFile);
      } else {
        const folderId = file.isFolderId;

        if (folderId || folderId == 0) {
          const oldFolder = this.foldersHierarchyFacade.findFolder(folderId);
          const newFolder = this.foldersHierarchyFacade.createFolder(
            file.name,
            actualFolder?.id,
          );

          const newFile = {
            ...file,
            pageConfigId: undefined,
            isFolderId: newFolder?.id,
            id: undefined,
            parentFolderId: actualFolder?.id,
          };

          if ((oldFolder?.id || oldFolder?.id == 0) && newFolder)
            this.copyAllThings(oldFolder?.id, newFolder);
          this.foldersHierarchyFacade.setNewFile(newFile);
        }
      }
    }
  }
}
