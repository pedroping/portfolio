import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import {
  CONFIG_TOKEN,
  DATA_TOKEN,
  IFolderData,
  INITIAL_FOLDER_ADRESS,
  IPageConfig,
} from '@portifolio/utils/util-models';
import { FileExplorerFacade } from '../../facade/file-explorer-facade.service';

@Component({
  selector: 'explorer-adress',
  templateUrl: './explorer-adress.component.html',
  styleUrls: ['./explorer-adress.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class ExplorerAdressComponent implements OnInit {
  id: number;
  adressControl = new FormControl<string>(INITIAL_FOLDER_ADRESS, {
    nonNullable: true,
  });

  constructor(
    private readonly fileExplorerFacade: FileExplorerFacade,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
    @Optional() @Inject(DATA_TOKEN) private readonly data: IFolderData,
    @Optional() @Inject(CONFIG_TOKEN) private readonly pageConfig: IPageConfig,
  ) {
    this.id = data.folderId ?? -1;
  }

  ngOnInit(): void {
    const folderAdress = this.foldersHierarchyFacade.getFolderAdress(this.id);
    this.adressControl.setValue(folderAdress);
  }

  findFolder() {
    const folderId = this.foldersHierarchyFacade.findFolderByAdress(
      this.adressControl.value,
    );

    if (folderId == null) return;

    if (folderId == 0) {
      this.fileExplorerFacade.createFolder(
        0,
        'Desktop',
        this.data.folderId,
        this.pageConfig,
      );

      return
    }

    const folder = this.foldersHierarchyFacade.findFolder(folderId);

    if (!folder) return;

    this.fileExplorerFacade.createFolder(
      folder.id,
      folder.title,
      this.data.folderId,
      this.pageConfig,
    );
  }
}
