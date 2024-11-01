import { Component, computed, ElementRef, input } from '@angular/core';
import { OpenContextMenuDirective } from '@portifolio/features/feature-context-menus';
import { IApp } from '@portifolio/utils/util-models';
import { FileRenameComponent } from '../components/file-rename/file-rename.component';
import { IconDropEventsHandleDirective } from '../directives/icon-drop-events-handle/icon-drop-events-handle.directive';
import { IconSelectedDirective } from '../directives/icon-selected/icon-selected.directive';
import { PageHandleDirective } from '../directives/page-handle/page-handle.directive';
import { APP_BASE_ICON } from '../mocks/app-mocks';
@Component({
  selector: 'app-icon',
  templateUrl: './app-icon.component.html',
  styleUrls: ['./app-icon.component.scss'],
  standalone: true,
  hostDirectives: [
    { directive: PageHandleDirective, inputs: ['config'] },
    { directive: IconSelectedDirective, inputs: ['config'] },
    { directive: IconDropEventsHandleDirective, inputs: ['config'] },
    { directive: OpenContextMenuDirective, inputs: ['id', 'openContextMenu'] },
  ],
  host: {
    id: 'app-icon',
    '[title]': 'title()',
    '[draggable]': 'true',
  },
  imports: [FileRenameComponent],
})
export class AppIconComponent {
  config = input.required<IApp>();
  id = input.required<string | number>();

  title = computed(() => this.config().name);
  logo = computed(() => this.config().logo || APP_BASE_ICON);

  elementRef: ElementRef<HTMLElement>;

  constructor(private readonly _elementRef: ElementRef<HTMLElement>) {
    this.elementRef = this._elementRef;
  }
}
