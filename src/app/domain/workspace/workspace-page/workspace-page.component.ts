import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
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
      name: 'Pagina',
      baseSizes: { width: 300, height: 200 },
      pageContent: TestPageComponent,
    };
    this.elementsFacede.createElement(0, {}, config);
  }
}
