import { Injectable } from '@angular/core';
import { ContextMenuFacade } from '@portifolio/features/feature-context-menus';
import { ElementsFacade } from '@portifolio/features/feature-page-creator';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { IFolderData, IOptionEvent } from '@portifolio/utils/util-models';
import { FOLDER_MOCK } from '../mocks/app-events-handle-mocks';

@Injectable({ providedIn: 'root' })
export class AppEventsHandleService {
  constructor(
    private readonly elementFacade: ElementsFacade<IFolderData>,
    private readonly contextMenuFacade: ContextMenuFacade<number>,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
  ) {}

  startDomain() {
    this.contextMenuFacade.optionSelected$$.subscribe((event) => {
      console.log(event);
      console.log(this.foldersHierarchyFacade.allFiles);
    });

    this.exploreEvent$$.subscribe((event) => this.handleExploreEvent(event));
  }

  handleExploreEvent(event: IOptionEvent<number>) {
    debugger;
    if (!event?.data && event?.data != 0) return;

    const file = this.foldersHierarchyFacade.getFile(event.data);

    if (!file) return;

    const parentFolderId = file.parentFolderId;

    this.elementFacade.createElement({ folderId: parentFolderId }, FOLDER_MOCK);
  }

  get exploreEvent$$() {
    return this.contextMenuFacade.getEventByOption('program-explore');
  }
}
