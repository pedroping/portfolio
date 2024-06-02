import { AfterViewInit, Component } from '@angular/core';
import { InitialMenuCreatorDirective } from '@portifolio/features/feature-inital-menu';
import {
  ElementsFacede,
  PageParentDirective,
} from '@portifolio/features/feature-page-creator';
import { ShowScreenDirective } from '@portifolio/ui/ui-splash-screen';
import { PAGE_01, PAGE_02 } from 'src/app/mocks/page-mocks';
@Component({
  selector: 'workspace-page',
  templateUrl: './workspace-page.component.html',
  styleUrls: ['./workspace-page.component.scss'],
  standalone: true,
  imports: [
    PageParentDirective,
    InitialMenuCreatorDirective,
    ShowScreenDirective,
  ],
})
export class WorkspacePageComponent implements AfterViewInit {
  constructor(private readonly elementsFacede: ElementsFacede) {}

  ngAfterViewInit(): void {
    this.elementsFacede.createElement({}, PAGE_01.config, PAGE_01.domConfig);
    // this.elementsFacede.createElement({}, PAGE_02.config, PAGE_02.domConfig);
  }
}
