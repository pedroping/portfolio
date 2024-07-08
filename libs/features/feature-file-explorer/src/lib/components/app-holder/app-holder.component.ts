import { AsyncPipe } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import {
  AppDropHandleDirective,
  AppIconComponent,
} from '@portifolio/features/feature-app-icon';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { DATA_TOKEN, IApp, IFolderData } from '@portifolio/utils/util-models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-holder',
  templateUrl: './app-holder.component.html',
  styleUrls: ['./app-holder.component.scss'],
  standalone: true,
  imports: [AppDropHandleDirective, AsyncPipe, AppIconComponent],
})
export class AppHolderComponent {
  id: number;
  files$$: Observable<IApp[]>;

  constructor(
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
    @Optional() @Inject(DATA_TOKEN) private readonly data: IFolderData
  ) {
    this.id = data?.folderId ?? 0;
    this.files$$ = this.foldersHierarchyFacade.getFileByFolder(this.id);
  }
}
