import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FolderSectionActionDirective } from '../../directives/folder-section-action/folder-section-action.directive';
import { ShowHideFolderDirective } from '../../directives/show-hide-folder/show-hide-folder.directive';
import { FileExplorerFacade } from '../../facade/file-explorer-facade.service';

@Component({
  selector: 'folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss'],
  standalone: true,
  imports: [
    NgTemplateOutlet,
    ShowHideFolderDirective,
    FolderSectionActionDirective,
    AsyncPipe,
  ],
})
export class FoldersComponent {
  allFolders$$ = this.fileExplorerFacade.allFolders$$;

  constructor(private readonly fileExplorerFacade: FileExplorerFacade) {
    this.fileExplorerFacade.createFolder('Teste');

    console.log(this.fileExplorerFacade.allFolders);
  }
}
