import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  OpenContextMenuDirective,
  WORKSPACE_ID,
} from '@portifolio/features/feature-context-menus';
import { MenuEventsFacade } from '@portifolio/features/feature-inital-menu';
import { ElementsFacade } from '@portifolio/features/feature-page-creator';
import { HandleCopyAndPasteEventsDirective } from '@portifolio/utils/util-app-copy-and-paste';
import { AppDropHandleDirective } from '@portifolio/utils/util-app-drop-handle';
import { FolderHandleComponent } from '@portifolio/utils/util-folder-handle';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { IFolderData } from '@portifolio/utils/util-models';
import { BASIC_FOLDER } from '../mocks/workspace-mocks';
@Component({
  selector: 'workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  standalone: true,
  imports: [AppDropHandleDirective, FolderHandleComponent, AsyncPipe],
  hostDirectives: [
    { directive: OpenContextMenuDirective, inputs: ['id', 'openContextMenu'] },
    {
      directive: HandleCopyAndPasteEventsDirective,
      inputs: ['parentFolderId', 'id'],
    },
  ],
  host: {
    id: WORKSPACE_ID,
  },
})
export class WorkspaceComponent implements OnInit, OnDestroy {
  appsConfig = BASIC_FOLDER;
  worksSpaceId = WORKSPACE_ID;

  constructor(
    private readonly menuEventsFacade: MenuEventsFacade,
    private readonly elementsFacade: ElementsFacade<IFolderData>,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
  ) {}

  ngOnInit(): void {
    this.appsConfig.forEach((app) => {
      this.foldersHierarchyFacade.setNewFile(app);
    });
  }

  ngOnDestroy() {
    this.elementsFacade.clearAll();
    this.menuEventsFacade.setCloseMenu();
    this.foldersHierarchyFacade.resetData();
  }
}
