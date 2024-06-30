import { Component, computed, input } from '@angular/core';
import { IApp } from '@portifolio/utils/util-models';
import { IconDropEventsHandleDirective } from '../directives/icon-drop-events-handle/icon-drop-events-handle.directive';
import { APP_BASE_ICON } from '../mocks/app-mocks';
import { OpenContextMenuDirective } from '@portifolio/features/feature-context-menus';
@Component({
  selector: 'app-icon',
  templateUrl: './app-icon.component.html',
  styleUrls: ['./app-icon.component.scss'],
  standalone: true,
  hostDirectives: [
    { directive: IconDropEventsHandleDirective, inputs: ['config'] },
    { directive: OpenContextMenuDirective, inputs: ['openContextMenu'] },
  ],
  host: {
    id: 'app-icon',
    '[draggable]': 'true',
  },
})
export class AppIconComponent {
  config = input.required<IApp>();
  title = computed(() => this.config().name);
  logo = computed(() => this.config().logo || APP_BASE_ICON);
}
