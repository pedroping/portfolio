import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { InitialMenuCreatorDirective } from '@portifolio/features/feature-inital-menu';
import {
  ElementsFacede,
  PageParentDirective,
} from '@portifolio/features/feature-page-creator';
import { MenuEventsService } from '@portifolio/utils/util-events';
@Component({
  selector: 'workspace-page',
  templateUrl: './workspace-page.component.html',
  styleUrls: ['./workspace-page.component.scss'],
  standalone: true,
  imports: [PageParentDirective, InitialMenuCreatorDirective],
})
export class WorkspacePageComponent implements OnDestroy, AfterViewInit {
  constructor(
    private readonly elementsFacede: ElementsFacede,
    private readonly menuEventsService: MenuEventsService
  ) {}

  ngAfterViewInit() {
    // this.elementsFacede.createElement(
    //   {},
    //   {
    //     name: 'File Explore',
    //     customX: 500,
    //     customY: 500,
    //     baseSizes: { width: 600, height: 500, minHeight: 500, minWidth: 600 },
    //     pageContent: FileExplorerComponent,
    //   },
    //   {
    //     opened: true,
    //     isFullScreen: false,
    //   }
    // );
  }

  ngOnDestroy() {
    this.elementsFacede.clearAll();
    this.menuEventsService.setCloseMenu();
  }
}
