import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import {
  InitialMenuCreatorDirective,
  MenuEventsService,
} from '@portifolio/features/feature-inital-menu';
import {
  ElementsFacede,
  IPageMock,
  PageParentDirective,
} from '@portifolio/features/feature-page-creator';
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
    this.elementsFacede.createElement(
      {},
      {
        name: 'Default Page',
        customX: 500,
        customY: 500,
        baseSizes: { width: 300, height: 200 },
      },
      {
        opened: true,
        isFullScreen: false,
      }
    );
  }

  ngOnDestroy() {
    this.elementsFacede.clearAll();
    this.menuEventsService.setCloseMenu();
  }
}
