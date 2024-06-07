import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { InitialMenuCreatorDirective } from '@portifolio/features/feature-inital-menu';
import {
  ElementsFacede,
  PageParentDirective,
} from '@portifolio/features/feature-page-creator';
import { PAGE_01, PAGE_02, PAGE_03 } from 'src/app/mocks/page-mocks';
@Component({
  selector: 'workspace-page',
  templateUrl: './workspace-page.component.html',
  styleUrls: ['./workspace-page.component.scss'],
  standalone: true,
  imports: [PageParentDirective, InitialMenuCreatorDirective],
})
export class WorkspacePageComponent implements AfterViewInit, OnDestroy {
  constructor(private readonly elementsFacede: ElementsFacede) {}

  ngAfterViewInit(): void {
    this.elementsFacede.createElement({}, PAGE_02.config, PAGE_02.domConfig);
    this.elementsFacede.createElement({}, PAGE_03.config, PAGE_03.domConfig);
    this.elementsFacede.createElement({}, PAGE_01.config, PAGE_01.domConfig);
  }

  ngOnDestroy(): void {
    this.elementsFacede.clearAll();
  }
}
