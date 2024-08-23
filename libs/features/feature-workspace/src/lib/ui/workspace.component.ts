import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  OpenContextMenuDirective,
  WORKSPACE_ID,
} from '@portifolio/features/feature-context-menus';
import { FolderHandleComponent } from '@portifolio/features/feature-file-explorer';
import { MenuEventsFacade } from '@portifolio/features/feature-inital-menu';
import { ElementsFacade } from '@portifolio/features/feature-page-creator';
import { AppDropHandleDirective } from '@portifolio/utils/util-app-drop-handle';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { IFolderData } from '@portifolio/utils/util-models';
import { TrashHandle } from '@portifolio/utils/util-trash-handle';
import { BASIC_FOLDER, TRASH_FILE } from '../mocks/workspace-mocks';
@Component({
  selector: 'workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  standalone: true,
  imports: [AsyncPipe, FolderHandleComponent, AppDropHandleDirective],
  hostDirectives: [
    { directive: OpenContextMenuDirective, inputs: ['id', 'openContextMenu'] },
  ],
  host: {
    id: WORKSPACE_ID,
  },
})
export class WorkspaceComponent implements OnInit, OnDestroy {
  appsConfig = BASIC_FOLDER;
  worksSpaceId = WORKSPACE_ID;

  constructor(
    private readonly trashHandle: TrashHandle,
    private readonly menuEventsFacade: MenuEventsFacade,
    private readonly elementsFacade: ElementsFacade<IFolderData>,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
  ) {}

  ngOnInit(): void {
    this.appsConfig.forEach((app) => {
      this.foldersHierarchyFacade.setNewFile(app);
    });

    const trashFile = this.foldersHierarchyFacade.setNewFile(TRASH_FILE);

    this.trashHandle.setFileId(trashFile.id);
  }

  ngOnDestroy() {
    this.elementsFacade.clearAll();
    this.menuEventsFacade.setCloseMenu();
    this.foldersHierarchyFacade.resetData();
  }
}
