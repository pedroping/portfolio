import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Optional,
  signal,
} from '@angular/core';
import { AppIconComponent } from '@portifolio/features/feature-app-icon';
import { AppDropHandleDirective } from '@portifolio/utils/util-app-drop-handle';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { DATA_TOKEN, IApp, IFolderData } from '@portifolio/utils/util-models';
import { OpenContextMenuDirective } from '@portifolio/features/feature-context-menus';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-holder',
  templateUrl: './app-holder.component.html',
  styleUrls: ['./app-holder.component.scss'],
  standalone: true,
  imports: [
    AppDropHandleDirective,
    AsyncPipe,
    AppIconComponent,
    OpenContextMenuDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
  '[id]': "'file-explorer-' + id()",
  },
})
export class AppHolderComponent {
  id = signal<number>(-1);
  files$$: Observable<IApp[]>;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
    @Optional() @Inject(DATA_TOKEN) private readonly data: IFolderData,
  ) {
    this.id.set(data?.folderId ?? 0);
    this.files$$ = this.foldersHierarchyFacade
      .getFileByFolder(this.id())
      .pipe(tap(() => this.cdr.detectChanges()));
  }
}
