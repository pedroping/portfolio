import { Component, computed, input } from '@angular/core';
import { IApp } from '@portifolio/utils/util-models';
import { AppRenameComponent } from '../component/app-rename.component';
import { AppIconEventsDirective } from '../directives/app-icon-events/app-icon-events.directive';
import { IconDropEventsHandleDirective } from '../directives/icon-drop-events-handle/icon-drop-events-handle.directive';
import { APP_BASE_ICON } from '../mocks/app-mocks';

@Component({
  selector: 'app-icon',
  templateUrl: './app-icon.component.html',
  styleUrls: ['./app-icon.component.scss'],
  standalone: true,
  hostDirectives: [
    { directive: AppIconEventsDirective, inputs: ['config', 'id'] },
    { directive: IconDropEventsHandleDirective, inputs: ['config'] },
  ],
  host: {
    id: 'app-icon',
    '[title]': 'title()',
    '[draggable]': 'true',
  },
  imports: [AppRenameComponent],
})
export class AppIconComponent {
  config = input.required<IApp>();
  id = input.required<string | number>();

  title = computed(() => this.config().name);
  logo = computed(() => this.config().logo || APP_BASE_ICON);
}
