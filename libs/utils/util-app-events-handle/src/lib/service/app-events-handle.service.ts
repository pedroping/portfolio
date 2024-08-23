import { Injectable } from '@angular/core';
import { ContextMenuFacade } from '@portifolio/features/feature-context-menus';
import { ElementsFacade } from '@portifolio/features/feature-page-creator';
import { AppCopyAndPasteFacade } from '@portifolio/utils/util-app-copy-and-paste';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { IApp, IFolderData, IOptionEvent } from '@portifolio/utils/util-models';
import { FOLDER_MOCK } from '../mocks/app-events-handle-mocks';
import { TrashHandle } from '@portifolio/utils/util-trash-handle';

@Injectable({ providedIn: 'root' })
export class AppEventsHandleService {
  constructor(
    private readonly trashHandle: TrashHandle,
    private readonly appCopyAndPasteFacade: AppCopyAndPasteFacade,
    private readonly contextMenuFacade: ContextMenuFacade<number>,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
    private readonly elementFacade: ElementsFacade<IFolderData | undefined>,
  ) {}

  startDomain() {
    this.cutEvent$$.subscribe((event) => this.handleCut(event));
    this.copyEvent$$.subscribe((event) => this.handleCopy(event));
    this.deleteEvent$$.subscribe((event) => this.handleDeleteEvent(event));
    this.exploreEvent$$.subscribe((event) => this.handleExploreEvent(event));
  }

  handleCut(event: IOptionEvent<number>) {
    if (!event?.data && event?.data != 0) return;
    this.appCopyAndPasteFacade.setCutEvent(event.data);
  }

  handleCopy(event: IOptionEvent<number>) {
    if (!event?.data && event?.data != 0) return;
    this.appCopyAndPasteFacade.setCopyEvent(event.data);
  }

  handleExploreEvent(event: IOptionEvent<number>) {
    if (!event?.data && event?.data != 0) return;

    const file = this.foldersHierarchyFacade.getFile(event.data);

    if (!file) return;

    const parentFolderId = file.parentFolderId;

    this.elementFacade.createElement({ folderId: parentFolderId }, FOLDER_MOCK);
  }

  handleDeleteEvent(event: IOptionEvent<number>) {
    if (!event?.data && event?.data != 0) return;

    const file = this.foldersHierarchyFacade.getFile(event.data);

    if (!file) return;

    if (
      file.parentFolderId != this.trashHandle.getTrashFolder()?.id &&
      file.id != this.trashHandle.id
    )
      return this.handleDeleteOutsideTrash(file);

    const isFolderId = file.isFolderId;

    if (file.preventFolderDelete) {
      if (file.isFolderId != undefined)
        this.trashHandle.setFolderId(file.isFolderId);

      return this.foldersHierarchyFacade.deleteFile(file.id);
    }

    if ((file.type == 'folder' && isFolderId) || isFolderId == 0)
      this.foldersHierarchyFacade.deleteFolder(isFolderId);

    this.foldersHierarchyFacade.deleteFile(file.id);
  }

  handleDeleteOutsideTrash(file: IApp) {
    const trashId = this.trashHandle.getTrashFolder()?.id;

    if (trashId == undefined) return;

    if (file.parentFolderId == trashId || file.isFolderId == trashId) return;

    if (file.isFolderId != undefined) {
      this.foldersHierarchyFacade.changeFolderId(file.id, trashId);
      this.foldersHierarchyFacade.moveFolder(file.isFolderId, trashId);
    }

    this.foldersHierarchyFacade.changeFolderId(file.id, trashId);
  }

  get exploreEvent$$() {
    return this.contextMenuFacade.getEventByOption('program-explore');
  }

  get openEvent$$() {
    return this.contextMenuFacade.getEventByOption('program-open');
  }

  get deleteEvent$$() {
    return this.contextMenuFacade.getEventByOption('program-delete');
  }

  get copyEvent$$() {
    return this.contextMenuFacade.getEventByOption('program-copy');
  }

  get cutEvent$$() {
    return this.contextMenuFacade.getEventByOption('program-cut');
  }
}
