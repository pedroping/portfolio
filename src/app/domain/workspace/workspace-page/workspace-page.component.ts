import { AfterViewInit, Component } from '@angular/core';
import {
  ElementsFacede,
  IInitialConfig,
  PageParentDirective,
} from '@portifolio/features/feature-page-creator';
import { TestPageComponent } from '../../../shared/test-page/test-page.component';

@Component({
  selector: 'workspace-page',
  templateUrl: './workspace-page.component.html',
  styleUrls: ['./workspace-page.component.scss'],
  standalone: true,
  imports: [PageParentDirective],
})
export class WorkspacePageComponent implements AfterViewInit {
  constructor(private readonly elementsFacede: ElementsFacede) {}

  ngAfterViewInit() {
    const config: IInitialConfig = {
      baseSizes: { width: 500, height: 500 },
      pageContent: TestPageComponent,
    };
    this.elementsFacede.createElement(0, {}, config);
  }
}
