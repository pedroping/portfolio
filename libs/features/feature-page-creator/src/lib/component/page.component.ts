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
import { PageCloseDirective } from '../directives/page-close/page-close.directive';
import { PageContentOverlayDirective } from '../directives/page-content-overlay/page-content-overlay.directive';
import { PageContentDirective } from '../directives/page-content/page-content.directive';
import { PageMaximizeDirective } from '../directives/page-maximize/page-maximize.directive';
import { PageMinimizeDirective } from '../directives/page-minimize/page-minimize.directive';
import { PageMoveDirective } from '../directives/page-move/page-move.directive';
import { PageResizeBottomDirective } from '../directives/page-resize-bottom/page-resize-bottom.directive';
import { PageResizeLeftDirective } from '../directives/page-resize-left/page-resize-left.directive';
import { PageResizeRightDirective } from '../directives/page-resize-right/page-resize-right.directive';
import { PageResizeTopDirective } from '../directives/page-resize-top/page-resize-top.directive';
import { PreventHandlerDirective } from '../directives/prevent-handler/prevent-handler.directive';
import { SetZIndexDirective } from '../directives/set-zIndex/set-zIndex.directive';
import { IPageComponent, IPageConfig } from '../models/elements-interfaces';
import { CONFIG_TOKEN } from '../models/elements-token';
import { ELEMENT_BASE_ICON } from '../mocks/elements.mocks';
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
    PageContentOverlayDirective,
    PageResizeRightDirective,
    PageResizeBottomDirective,
    PageResizeLeftDirective,
    PageResizeTopDirective,
  ],
  host: {
    '[attr.page-id]': 'id()',
    '[attr.page-name]': 'name()',
    '[style.width]': 'width()',
    '[style.height]': 'height()',
    '[style.minWidth]': 'width()',
    '[style.minHeight]': 'height()',
  },
  hostDirectives: [SetZIndexDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent implements IPageComponent, OnInit {
  id = signal<number>(-1);
  name = signal<string>('');
  icon = signal<string>('');
  width = signal<string>('auto');
  height = signal<string>('auto');
  element: HTMLElement;

  constructor(
    private readonly _elementRef: ElementRef<HTMLElement>,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {
    this.element = this._elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.name.set(this._config.name);
    this.id.set(this._config.elementReference.id);
    this.width.set(this._config.baseSizes.width + 'px');
    this.height.set(this._config.baseSizes.height + 'px');
    this.icon.set(this._config.icon ?? ELEMENT_BASE_ICON);
  }
}
