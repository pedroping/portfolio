import { AfterViewInit, Component, OnDestroy } from '@angular/core';
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
import { IApp, IFolderData } from '@portifolio/utils/util-models';
import { WorkspaceReferenceDirective } from '@portifolio/utils/util-workspace-reference';

@Component({
  selector: 'workspace-page',
  templateUrl: './workspace-page.component.html',
  styleUrls: ['./workspace-page.component.scss'],
  standalone: true,
  imports: [
    AppIconComponent,
    OpenContextMenuDirective,
    InitialMenuCreatorDirective,
    WorkspaceReferenceDirective,
    AppDropHandleDirective,
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
