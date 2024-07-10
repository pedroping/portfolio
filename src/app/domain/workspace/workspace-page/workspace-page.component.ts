import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { AppDropHandleDirective } from '@portifolio/features/feature-app-icon';
import {
  InitialMenuCreatorDirective,
  MenuEventsFacade,
} from '@portifolio/features/feature-inital-menu';
import { ElementsFacade } from '@portifolio/features/feature-page-creator';
import { WorkspaceComponent } from '@portifolio/features/feature-workspace';
import { IFolderData } from '@portifolio/utils/util-models';
import { WorkspaceReferenceDirective } from '@portifolio/utils/util-workspace-reference';
@Component({
  selector: 'workspace-page',
  templateUrl: './workspace-page.component.html',
  styleUrls: ['./workspace-page.component.scss'],
  standalone: true,
  imports: [
    InitialMenuCreatorDirective,
    WorkspaceReferenceDirective,
    AppDropHandleDirective,
    WorkspaceComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspacePageComponent implements OnDestroy {
  constructor(
    private readonly menuEventsFacade: MenuEventsFacade,
    private readonly elementsFacade: ElementsFacade<IFolderData>
  ) {}

  ngOnDestroy() {
    this.elementsFacade.clearAll();
    this.menuEventsFacade.setCloseMenu();
  }
}
