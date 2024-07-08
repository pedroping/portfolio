import { AsyncPipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AppDropHandleDirective,
  AppIconComponent,
} from '@portifolio/features/feature-app-icon';
import { OpenContextMenuDirective } from '@portifolio/features/feature-context-menus';
import { FileExplorerComponent } from '@portifolio/features/feature-file-explorer';
import {
  InitialMenuCreatorDirective,
  MenuEventsFacade,
} from '@portifolio/features/feature-inital-menu';
import { ElementsFacade } from '@portifolio/features/feature-page-creator';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { IBasicApp, IFolderData } from '@portifolio/utils/util-models';
import { WorkspaceReferenceDirective } from '@portifolio/utils/util-workspace-reference';
import { tap } from 'rxjs';

@Component({
  selector: 'workspace-page',
  templateUrl: './workspace-page.component.html',
  styleUrls: ['./workspace-page.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    AppIconComponent,
    OpenContextMenuDirective,
    InitialMenuCreatorDirective,
    WorkspaceReferenceDirective,
    AppDropHandleDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspacePageComponent
  implements OnDestroy, OnInit, AfterViewInit
{
  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly menuEventsFacade: MenuEventsFacade,
    private readonly ElementsFacade: ElementsFacade<IFolderData>,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade
  ) {}

  appsConfig: IBasicApp[] = [
    {
      name: 'Uma pagina louca de teste',
      logo: '',
      type: 'folder',
      folderId: 0,
    },
    {
      name: 'Curriculum',
      logo: '/assets/images/pdf-icon.png',
      type: 'file',
      folderId: 0,
    },
  ];

  files$ = this.foldersHierarchyFacade
    .getFileByFolder(0)
    .pipe(tap(() => this.cdr.detectChanges()));

  ngOnInit(): void {
    this.appsConfig.forEach((app) => {
      const file = this.foldersHierarchyFacade.setNewFile(app);
      if (app.type == 'folder') {
        const folder = this.foldersHierarchyFacade.createFolder(app.name);

        file.isFolderId = folder?.id;
      }
    });
  }

  ngAfterViewInit() {
    this.ElementsFacade.createElement(
      { folderId: 0 },
      {
        name: 'File Explorer',
        customX: 500,
        customY: 500,
        baseSizes: { width: 600, height: 500, minHeight: 500, minWidth: 600 },
        pageContent: FileExplorerComponent,
        opened: true,
        isFullScreen: false,
      }
    );

    const id = this.foldersHierarchyFacade.createFolder(
      'Explorador de arquivos 2'
    )?.id;

    if (id)
      this.ElementsFacade.createElement(
        { folderId: id },
        {
          name: 'Explorador de arquivos 2',
          customX: 200,
          customY: 200,
          baseSizes: { width: 600, height: 500, minHeight: 500, minWidth: 600 },
          pageContent: FileExplorerComponent,
          opened: true,
          isFullScreen: false,
        }
      );
  }

  ngOnDestroy() {
    this.ElementsFacade.clearAll();
    this.menuEventsFacade.setCloseMenu();
  }
}
