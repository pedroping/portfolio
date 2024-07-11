import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppIconComponent } from '@portifolio/features/feature-app-icon';
import {
  OpenContextMenuDirective,
  WORKSPACE_ID,
} from '@portifolio/features/feature-context-menus';
import { IconDropHandleDirective } from '@portifolio/features/feature-icon-drop-handle';
import { ElementsFacade } from '@portifolio/features/feature-page-creator';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { IFolderData } from '@portifolio/utils/util-models';
import { tap } from 'rxjs';
import { BASIC_FOLDER, FOLDER_02 } from '../mocks/workspace-mocks';

@Component({
  selector: 'workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  standalone: true,
  imports: [IconDropHandleDirective, AppIconComponent, AsyncPipe],
  hostDirectives: [
    { directive: OpenContextMenuDirective, inputs: ['id', 'openContextMenu'] },
  ],
  host: {
    id: WORKSPACE_ID,
  },
})
export class WorkspaceComponent implements OnInit {
  appsConfig = BASIC_FOLDER;

  files$ = this.foldersHierarchyFacade
    .getFileByFolder(0)
    .pipe(tap(() => this.cdr.detectChanges()));

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly elementsFacade: ElementsFacade<IFolderData>,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
  ) {}

  ngOnInit(): void {
    this.appsConfig.forEach((app) => {
      const file = this.foldersHierarchyFacade.setNewFile(app);
      if (app.type == 'folder') {
        const folder = this.foldersHierarchyFacade.createFolder(app.name);

        file.isFolderId = folder?.id;

        if (folder?.id)
          this.elementsFacade.createElement(
            { folderId: folder?.id },
            FOLDER_02,
          );
      }
    });
  }
}
