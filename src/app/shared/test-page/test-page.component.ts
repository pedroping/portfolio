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
  name: string;
  constructor(@Inject(CONFIG_TOKEN) private readonly _config: IPageConfig) {
    this.name = this._config.name;
  }
}
