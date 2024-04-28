import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  CloseComponent,
  MaximizeComponent,
  MinimizeComponent,
} from '@portifolio/ui/ui-page-actions-buttons';
import { PageCloseDirective } from '../../directives/page-close/page-close.directive';
import { PageContentDirective } from '../../directives/page-content/page-content.directive';
import { PageMaximizeDirective } from '../../directives/page-maximize/page-maximize.directive';
import { PageMinimizeDirective } from '../../directives/page-minimize/page-minimize.directive';
import { PageMoveDirective } from '../../directives/page-move/page-move.directive';
import { PageResizeDirective } from '../../directives/page-resize/page-resize.directive';
import { PreventHandlerDirective } from '../../directives/prevent-handler/prevent-handler.directive';
import { SetZIndexDirective } from '../../directives/set-zIndex/set-zIndex.directive';
import { IPageComponent, IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';
@Component({
  selector: 'feature-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  standalone: true,
  imports: [
    PreventHandlerDirective,
    PageMinimizeDirective,
    PageMaximizeDirective,
    PageContentDirective,
    PageCloseDirective,
    MinimizeComponent,
    MaximizeComponent,
    PageMoveDirective,
    CloseComponent,
  ],
  host: {
    '[style.height]': 'height()',
    '[style.width]': 'width()',
    '[style.minHeight]': 'height()',
    '[style.minWidth]': 'width()',
  },
  hostDirectives: [SetZIndexDirective, PageResizeDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent implements IPageComponent, OnInit {
  element: ElementRef<HTMLElement>;
  width = signal<string>('auto');
  height = signal<string>('auto');
  name: string;

  constructor(
    private readonly _elementRef: ElementRef<HTMLElement>,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {
    this.element = this._elementRef;
    this.name = this._config.name;
  }

  ngOnInit(): void {
    this.width.set(this._config.baseSizes.width + 'px');
    this.height.set(this._config.baseSizes.height + 'px');
  }
}
