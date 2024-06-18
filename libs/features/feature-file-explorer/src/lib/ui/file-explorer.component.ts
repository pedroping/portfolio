import { Component } from '@angular/core';
import { ExploreShortcutsComponent } from '../components/explore-shortcuts/explore-shortcuts.component';
import { ExplorerAdressComponent } from '../components/explorer-adress/explorer-adress.component';

@Component({
  selector: 'file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss'],
  standalone: true,
  imports: [ExploreShortcutsComponent, ExplorerAdressComponent],
})
export class FileExplorerComponent {}
