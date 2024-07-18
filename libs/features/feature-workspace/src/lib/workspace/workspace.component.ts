import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppIconComponent } from '@portifolio/features/feature-app-icon';
import {
  OpenContextMenuDirective,
  WORKSPACE_ID,
} from '@portifolio/features/feature-context-menus';
import { AppDropHandleDirective } from '@portifolio/utils/util-app-drop-handle';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { tap } from 'rxjs';
import { BASIC_FOLDER } from '../mocks/workspace-mocks';

@Component({
  selector: 'workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  standalone: true,
  imports: [AppDropHandleDirective, AppIconComponent, AsyncPipe],
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
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
  ) {}

  ngOnInit(): void {
    this.appsConfig.forEach((app) => {
      this.foldersHierarchyFacade.setNewFile(app);
    });
  }
}
