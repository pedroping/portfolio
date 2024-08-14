import { DestroyRef, Directive, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContextMenuFacade } from '@portifolio/features/feature-context-menus';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import {
  IApp,
  IFolder,
  IOptionEvent,
  TBasicApp,
} from '@portifolio/utils/util-models';
import { Observable } from 'rxjs';
import { AppCopyAndPasteFacade } from '../../facade/app-copy-and-paste-facade.service';
import { SelectLastFolderDirective } from '../select-last-folder/select-last-folder.directive';

@Directive({
  selector: '[handleCopyAndPasteEvents]',
  standalone: true,
  hostDirectives: [
    { directive: SelectLastFolderDirective, inputs: ['folderId', 'parentId'] },
  ],
})
export class HandleCopyAndPasteEventsDirective implements OnInit {
  folderId = input.required<number>();
  parentId = input.required<string>();
  pasteEvent$?: Observable<IOptionEvent<unknown>>;

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly contextMenuFacade: ContextMenuFacade<unknown>,
    private readonly appCopyAndPasteFacade: AppCopyAndPasteFacade,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
  ) {}

  ngOnInit(): void {
    this.pasteEvent$ = this.contextMenuFacade.getEventByOption(
      'paste',
      this.parentId(),
    );

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

    if (
      file.parentFolderId == this.folderId() ||
      file.isFolderId == this.folderId()
    )
      return;

    if (file.isFolderId || file.isFolderId == 0) {
      const hasSameChild = this.foldersHierarchyFacade.hasSameChild(
        file.isFolderId,
        this.folderId(),
      );

      if (hasSameChild) return;

      this.foldersHierarchyFacade.changeFolderId(id, this.folderId());
      this.foldersHierarchyFacade.moveFolder(file.isFolderId, this.folderId());
    }

    this.foldersHierarchyFacade.changeFolderId(id, this.folderId());
  }

  handleCopy(id: number) {
    const file = this.foldersHierarchyFacade.getFile(id);

    if (!file) return;

    if (file.type == 'file') {
      const newFile = this.createNewFile(file, undefined);
      this.foldersHierarchyFacade.setNewFile(newFile);

      return;
    }

    if (!file.isFolderId && file.isFolderId != 0) return;

    const oldFolder = this.foldersHierarchyFacade.findFolder(file.isFolderId);

    const newFolder = this.foldersHierarchyFacade.createFolder(
      file.name + '-copy',
      file.logo,
      this.folderId() == 0 ? undefined : this.folderId(),
    );

    const newFile = this.createNewFile(file, newFolder?.id);

    if (!newFolder || (!oldFolder?.id && oldFolder?.id != 0)) return;

    this.copyAllThings(oldFolder.id, newFolder);
    this.foldersHierarchyFacade.setNewFile(newFile);
  }

  createNewFile(
    file: IApp,
    newFolderId?: number,
    parentFolderId?: number,
  ): TBasicApp {
    return {
      ...file,
      name: file.name + '-copy',
      pageConfigId: undefined,
      isFolderId: newFolderId,
      parentFolderId:
        parentFolderId == undefined ? this.folderId() : parentFolderId,
    };
  }

  copyAllThings(oldFolderId: number, actualFolder: IFolder) {
    const files = this.foldersHierarchyFacade.getFileByFolder(oldFolderId);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type == 'file') {
        const newFile = this.createNewFile(file, undefined, actualFolder.id);
        this.foldersHierarchyFacade.setNewFile(newFile);
      } else {
        const folderId = file.isFolderId;

        if (folderId || folderId == 0) {
          const oldFolder = this.foldersHierarchyFacade.findFolder(folderId);

          const newFolder = this.foldersHierarchyFacade.createFolder(
            file.name + '-copy',
            file.logo,
            actualFolder?.id,
          );

          const newFile = this.createNewFile(
            file,
            newFolder?.id,
            actualFolder.id,
          );

          if ((oldFolder?.id || oldFolder?.id == 0) && newFolder)
            this.copyAllThings(oldFolder?.id, newFolder);

          this.foldersHierarchyFacade.setNewFile(newFile);
        }
      }
    }
  }
}
