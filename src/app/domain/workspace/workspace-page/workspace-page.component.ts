import { Component } from '@angular/core';
import { InitialMenuCreatorDirective } from '@portifolio/features/feature-inital-menu';
import {
  PageParentDirective
} from '@portifolio/features/feature-page-creator';
@Component({
  selector: 'workspace-page',
  templateUrl: './workspace-page.component.html',
  styleUrls: ['./workspace-page.component.scss'],
  standalone: true,
  imports: [PageParentDirective, InitialMenuCreatorDirective],
})
export class WorkspacePageComponent {}
