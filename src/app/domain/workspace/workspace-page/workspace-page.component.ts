import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FileExplorerComponent } from '@portifolio/features/feature-file-explorer';
import { InitialMenuCreatorDirective } from '@portifolio/features/feature-inital-menu';
import { PageParentDirective } from '@portifolio/features/feature-page-creator';
import {
  ElementsFacade,
  MenuEventsFacade,
} from '@portifolio/utils/util-facades';
@Component({
  selector: 'workspace-page',
  templateUrl: './workspace-page.component.html',
  styleUrls: ['./workspace-page.component.scss'],
  standalone: true,
  imports: [PageParentDirective, InitialMenuCreatorDirective],
})
export class WorkspacePageComponent implements OnDestroy, AfterViewInit {
  constructor(
    private readonly ElementsFacade: ElementsFacade,
    private readonly menuEventsFacade: MenuEventsFacade
  ) {}

  ngAfterViewInit() {
    this.ElementsFacade.createElement(
      {},
      {
        name: 'File Explorer',
        customX: 500,
        customY: 500,
        baseSizes: { width: 600, height: 500, minHeight: 500, minWidth: 600 },
        pageContent: FileExplorerComponent,
      },
      {
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
