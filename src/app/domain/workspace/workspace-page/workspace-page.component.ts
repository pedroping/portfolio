import { AfterViewInit, Component } from '@angular/core';
import {
  ElementsFacede,
  IDomElementOptions,
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
    const config1: IInitialConfig = {
      name: 'Pagina',
      baseSizes: { width: 300, height: 200 },
      pageContent: TestPageComponent,
    };

    const config2: IInitialConfig = {
      name: 'Pagina2',
      baseSizes: { width: 200, height: 250 },
      customX: 100,
      customY: 150,
      pageContent: TestPageComponent,
    };

    const domConfig: IDomElementOptions = {
      isFullScreen: true,
    };

    this.elementsFacede.createElement(0, {}, config1);
    this.elementsFacede.createElement(1, {}, config2, domConfig);
  }
}
