import { Component } from '@angular/core';
import { HandleFolderShortcutDirective } from '../../directives/handle-folder-shortcut/handle-folder-shortcut.directive';

@Component({
  selector: 'menu-shortcuts',
  templateUrl: './menu-shortcuts.component.html',
  styleUrls: ['./menu-shortcuts.component.scss'],
  standalone: true,
  imports: [HandleFolderShortcutDirective],
})
export class MenuShortcutsComponent {}
