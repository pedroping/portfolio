import { DestroyRef, Directive, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContextMenuFacade } from '@portifolio/features/feature-context-menus';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { IFolder, IOptionEvent } from '@portifolio/utils/util-models';
import { Observable } from 'rxjs';
import { AppCopyAndPasteFacade } from '../facade/app-copy-and-paste-facade.service';

@Directive({
  selector: '[handleCopyAndPasteEvents]',
  standalone: true,
})
export class HandleCopyAndPasteEventsDirective implements OnInit {
  id = input.required<number>();
  parentFolderId = input.required<string>();
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
      this.parentFolderId(),
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
        name: file.name + '-copy',
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
      file.name + '-copy',
      this.id() == 0 ? undefined : this.id(),
    );

    const newFile = {
      ...file,
      name: file.name + '-copy',
      pageConfigId: undefined,
      isFolderId: newFolder?.id,
      id: undefined,
      parentFolderId: this.id(),
    };

    if (!newFolder || (!oldFolder?.id && oldFolder?.id != 0)) return;

    this.copyAllThings(oldFolder?.id, newFolder);
    this.foldersHierarchyFacade.setNewFile(newFile);
  }

  copyAllThings(oldFolderId: number, actualFolder: IFolder) {
    const files = this.foldersHierarchyFacade.getFileByFolder(oldFolderId);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type == 'file') {
        const newFile = {
          ...file,
          name: file.name + '-copy',
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
            file.name + '-copy',
            actualFolder?.id,
          );

          const newFile = {
            ...file,
            name: file.name + '-copy',
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
