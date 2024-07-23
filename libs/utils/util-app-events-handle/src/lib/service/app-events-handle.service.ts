import { Injectable } from '@angular/core';
import { ContextMenuFacade } from '@portifolio/features/feature-context-menus';
import { ElementsFacade } from '@portifolio/features/feature-page-creator';
import { AppCopyAndPasteFacade } from '@portifolio/utils/util-app-copy-and-paste';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { IFolderData, IOptionEvent } from '@portifolio/utils/util-models';
import { FOLDER_MOCK } from '../mocks/app-events-handle-mocks';

@Injectable({ providedIn: 'root' })
export class AppEventsHandleService {
  constructor(
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

    const isFolderId = file.isFolderId;

    if ((file.type == 'folder' && isFolderId) || isFolderId == 0)
      this.foldersHierarchyFacade.deleteFolder(isFolderId);

    this.foldersHierarchyFacade.deleteFile(file.id);
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
