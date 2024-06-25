import { Component } from '@angular/core';
import { FolderSectionActionDirective } from '../../directives/folder-section-action/folder-section-action.directive';

@Component({
  selector: 'explore-shortcuts',
  templateUrl: './explore-shortcuts.component.html',
  styleUrls: ['./explore-shortcuts.component.scss'],
  standalone: true,
  imports: [FolderSectionActionDirective],
})
export class ExploreShortcutsComponent {}
