import { Component } from '@angular/core';
import { HandleFolderShortcutDirective } from '../../directives/handle-folder-shortcut/handle-folder-shortcut.directive';
import { HandlePageOpenDirective } from '../../directives/handle-page-open/handle-page-open.directive';
import { HELP_AND_SUPPORT } from '../../mocks/program-mocks';

@Component({
  selector: 'menu-shortcuts',
  templateUrl: './menu-shortcuts.component.html',
  styleUrls: ['./menu-shortcuts.component.scss'],
  standalone: true,
  imports: [HandleFolderShortcutDirective, HandlePageOpenDirective],
})
export class MenuShortcutsComponent {
  helpAndSupport = HELP_AND_SUPPORT;
}
