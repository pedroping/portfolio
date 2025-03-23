import { Component, Inject, Optional } from '@angular/core';
import { DATA_TOKEN, IFolderData } from '@portifolio/utils/util-models';
import { AppHolderComponent } from '../components/app-holder/app-holder.component';
import { ExploreShortcutsComponent } from '../components/explore-shortcuts/explore-shortcuts.component';
import { CreateSectionDirective } from '../directives/create-section/create-section.directive';
import { FILE_EXPLORER_ID } from '../mocks/file-explorer-mocks';

@Component({
  selector: 'file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss'],
  standalone: true,
  imports: [
    AppHolderComponent,
    ExploreShortcutsComponent,
    CreateSectionDirective,
  ],
})
export class FileExplorerComponent {
  id: number;
  fileExplorerId = FILE_EXPLORER_ID;

  constructor(
    @Optional() @Inject(DATA_TOKEN) private readonly data: IFolderData,
  ) {
    this.id = data?.folderId ?? -1;
  }
}
