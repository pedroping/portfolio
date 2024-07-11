import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Type,
  signal,
} from '@angular/core';
import {
  CloseComponent,
  MaximizeComponent,
  MinimizeComponent,
} from '@portifolio/ui/ui-page-actions-buttons';
import {
  CONFIG_TOKEN,
  IPageComponent,
  IPageConfig,
} from '@portifolio/utils/util-models';
import { PageCloseDirective } from '../directives/page-close/page-close.directive';
import { PageContentOverlayDirective } from '../directives/page-content-overlay/page-content-overlay.directive';
import { PageMaximizeDirective } from '../directives/page-maximize/page-maximize.directive';
import { PageMinimizeDirective } from '../directives/page-minimize/page-minimize.directive';
import { PageMoveDirective } from '../directives/page-move/page-move.directive';
import { PageResizeBottomDirective } from '../directives/page-resize-bottom/page-resize-bottom.directive';
import { PageResizeLeftDirective } from '../directives/page-resize-left/page-resize-left.directive';
import { PageResizeRightDirective } from '../directives/page-resize-right/page-resize-right.directive';
import { PageResizeTopDirective } from '../directives/page-resize-top/page-resize-top.directive';
import { PreventHandlerDirective } from '../directives/prevent-handler/prevent-handler.directive';
import { SetZIndexDirective } from '../directives/set-zIndex/set-zIndex.directive';
import { WindowResizeDirective } from '../directives/window-resize/window-resize.directive';
import {
  BASE_HEIGHT,
  BASE_WIDTH,
  ELEMENT_BASE_ICON,
} from '../mocks/elements.mocks';

@Component({
  selector: 'feature-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  standalone: true,
  imports: [
    CloseComponent,
    MinimizeComponent,
    MaximizeComponent,
    PageMoveDirective,
    NgComponentOutlet,
    PageCloseDirective,
    PageMinimizeDirective,
    PageMaximizeDirective,
    PageResizeTopDirective,
    PreventHandlerDirective,
    PageResizeLeftDirective,
    PageResizeRightDirective,
    PageResizeBottomDirective,
    PageContentOverlayDirective,
  ],
  host: {
    '[attr.page-id]': 'id()',
    '[attr.page-name]': 'name()',
    '[style.width]': 'width()',
    '[style.height]': 'height()',
    '[style.minWidth]': 'minWidth()',
    '[style.minHeight]': 'minHeight()',
  },
  hostDirectives: [SetZIndexDirective, WindowResizeDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent implements IPageComponent, OnInit {
  id = signal<number>(-1);
  name = signal<string>('');
  icon = signal<string>('');
  width = signal<string>('auto');
  height = signal<string>('auto');
  minWidth = signal<string>('unset');
  minHeight = signal<string>('unset');
  pageContent = signal<Type<unknown> | null>(null);
  element: HTMLElement;

  constructor(
    private readonly _elementRef: ElementRef<HTMLElement>,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig,
  ) {
    this.element = this._elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.name.set(this._config.name);
    this.id.set(this._config.id);
    this.width.set(this._config.baseSizes.width + 'px');
    this.height.set(this._config.baseSizes.height + 'px');
    this.icon.set(this._config.icon ?? ELEMENT_BASE_ICON);
    this.pageContent.set(this._config.pageContent ?? null);

    this._config.baseSizes.minHeight =
      this._config.baseSizes?.minHeight ?? BASE_HEIGHT;
    this._config.baseSizes.minWidth =
      this._config.baseSizes?.minWidth ?? BASE_WIDTH;

    this.minHeight.set(this._config.baseSizes.minHeight + 'px');
    this.minWidth.set(this._config.baseSizes.minWidth + 'px');
  }
}
