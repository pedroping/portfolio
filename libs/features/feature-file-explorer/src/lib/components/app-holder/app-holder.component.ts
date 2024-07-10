import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Optional,
} from '@angular/core';
import { AppIconComponent } from '@portifolio/features/feature-app-icon';
import { IconDropHandleDirective } from '@portifolio/features/feature-icon-drop-handle';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { DATA_TOKEN, IApp, IFolderData } from '@portifolio/utils/util-models';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-holder',
  templateUrl: './app-holder.component.html',
  styleUrls: ['./app-holder.component.scss'],
  standalone: true,
  imports: [IconDropHandleDirective, AsyncPipe, AppIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHolderComponent {
  id: number;
  files$$: Observable<IApp[]>;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
    @Optional() @Inject(DATA_TOKEN) private readonly data: IFolderData
  ) {
    this.id = data?.folderId ?? 0;
    this.files$$ = this.foldersHierarchyFacade
      .getFileByFolder(this.id)
      .pipe(tap(() => this.cdr.detectChanges()));
  }
}
