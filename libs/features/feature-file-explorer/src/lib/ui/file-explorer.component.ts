import { Component } from '@angular/core';
import { AppHolderComponent } from '../components/app-holder/app-holder.component';
import { ExploreShortcutsComponent } from '../components/explore-shortcuts/explore-shortcuts.component';
import { ExplorerAdressComponent } from '../components/explorer-adress/explorer-adress.component';
import { CreateFoldersSectionDirective } from '../directives/create-folders-section/create-folders-section.directive';

@Component({
  selector: 'file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss'],
  standalone: true,
  imports: [
    AppHolderComponent,
    ExploreShortcutsComponent,
    ExplorerAdressComponent,
    CreateFoldersSectionDirective,
  ],
})
export class FileExplorerComponent {}
