import { Component, Inject } from '@angular/core';
import {
  CONFIG_TOKEN,
  IPageConfig,
} from '@portifolio/features/feature-page-creator';

@Component({
  selector: 'test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
  standalone: true,
})
export class TestPageComponent {
  constructor(@Inject(CONFIG_TOKEN) private readonly _config: IPageConfig) {}
}
