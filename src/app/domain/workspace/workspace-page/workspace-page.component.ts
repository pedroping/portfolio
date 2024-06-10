import { Component, OnDestroy } from '@angular/core';
import {
  InitialMenuCreatorDirective,
  MenuEventsService,
} from '@portifolio/features/feature-inital-menu';
import {
  ElementsFacede,
  PageParentDirective,
} from '@portifolio/features/feature-page-creator';
@Component({
  selector: 'workspace-page',
  templateUrl: './workspace-page.component.html',
  styleUrls: ['./workspace-page.component.scss'],
  standalone: true,
  imports: [PageParentDirective, InitialMenuCreatorDirective],
})
export class WorkspacePageComponent implements OnDestroy {
  constructor(
    private readonly elementsFacede: ElementsFacede,
    private readonly menuEventsService: MenuEventsService
  ) {}

  ngOnDestroy(): void {
    this.elementsFacede.clearAll();
    this.menuEventsService.setCloseMenu();
  }
}
