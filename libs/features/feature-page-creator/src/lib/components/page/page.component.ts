import { Component, ElementRef, Inject } from '@angular/core';
import { PageContentDirective } from '../../directives/page-content/page-content.directive';
import { IPageComponent, IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  standalone: true,
  imports: [PageContentDirective],
})
export class PageComponent implements IPageComponent {
  element: ElementRef<HTMLElement>;

  constructor(
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig,
    private readonly _elementRef: ElementRef<HTMLElement>
  ) {
    this.element = this._elementRef;
  }
}
