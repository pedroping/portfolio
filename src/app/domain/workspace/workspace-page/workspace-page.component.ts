import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WORKSPACE_ID } from '@portifolio/features/feature-context-menus';
import { InitialMenuCreatorDirective } from '@portifolio/features/feature-inital-menu';
import { WorkspaceComponent } from '@portifolio/features/feature-workspace';
import { WorkspaceReferenceDirective } from '@portifolio/utils/util-workspace-reference';
@Component({
  selector: 'workspace-page',
  templateUrl: './workspace-page.component.html',
  styleUrls: ['./workspace-page.component.scss'],
  standalone: true,
  imports: [
    InitialMenuCreatorDirective,
    WorkspaceReferenceDirective,
    WorkspaceComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspacePageComponent {
  worksSpaceId = WORKSPACE_ID;
}
