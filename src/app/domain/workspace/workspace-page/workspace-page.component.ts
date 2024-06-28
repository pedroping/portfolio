import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { AppIconComponent } from '@portifolio/features/feature-app-icon';
import { OpenContextMenuDirective } from '@portifolio/features/feature-context-menus';
import { FileExplorerComponent } from '@portifolio/features/feature-file-explorer';
import { InitialMenuCreatorDirective } from '@portifolio/features/feature-inital-menu';
import { PageParentDirective } from '@portifolio/features/feature-page-creator';
import {
  ElementsFacade,
  MenuEventsFacade,
} from '@portifolio/utils/util-facades';
import { IApp } from '@portifolio/utils/util-models';
import { IFolderData } from 'libs/features/feature-file-explorer/src/lib/models/folders-models';
@Component({
  selector: 'workspace-page',
  templateUrl: './workspace-page.component.html',
  styleUrls: ['./workspace-page.component.scss'],
  standalone: true,
  imports: [
    AppIconComponent,
    PageParentDirective,
    OpenContextMenuDirective,
    InitialMenuCreatorDirective,
  ],
})
export class WorkspacePageComponent implements OnDestroy, AfterViewInit {
  constructor(
    private readonly menuEventsFacade: MenuEventsFacade,
    private readonly ElementsFacade: ElementsFacade<IFolderData>
  ) {}

  appConfig: IApp = { name: 'Uma pagina louca de teste', logo: '' };

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
  }

  ngOnDestroy() {
    this.ElementsFacade.clearAll();
    this.menuEventsFacade.setCloseMenu();
  }
}
