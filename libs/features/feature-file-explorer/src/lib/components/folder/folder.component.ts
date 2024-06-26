import { Component } from '@angular/core';
import { FolderSectionActionDirective } from '../../directives/folder-section-action/folder-section-action.directive';

@Component({
  selector: 'folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
  standalone: true,
  imports: [FolderSectionActionDirective],
})
export class FolderComponent {}
