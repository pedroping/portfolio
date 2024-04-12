import { Component, ElementRef, Inject, OnInit, signal } from '@angular/core';
import { MoveHandlerDirective } from '../../directives/move-handler/move-handler.directive';
import { PageContentDirective } from '../../directives/page-content/page-content.directive';
import { IPageComponent, IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  standalone: true,
  imports: [PageContentDirective, MoveHandlerDirective],
  host: {
    '[style.height]': 'height()',
    '[style.width]': 'width()',
    '[style.minHeight]': 'height()',
    '[style.minWidth]': 'width()',
  },
})
export class PageComponent implements IPageComponent, OnInit {
  element: ElementRef<HTMLElement>;
  width = signal<string>('auto');
  height = signal<string>('auto');
  name: string;

  constructor(
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig,
    private readonly _elementRef: ElementRef<HTMLElement>
  ) {
    this.element = this._elementRef;
    this.name = this._config.name;
  }

  ngOnInit(): void {
    this.width.set(this._config.baseSizes.width + 'px');
    this.height.set(this._config.baseSizes.height + 'px');
  }
}
