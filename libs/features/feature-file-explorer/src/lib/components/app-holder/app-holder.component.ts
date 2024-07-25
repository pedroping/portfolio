import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  input,
  OnInit
} from '@angular/core';
import {
  OpenContextMenuDirective
} from '@portifolio/features/feature-context-menus';
import {
  HandleCopyAndPasteEventsDirective
} from '@portifolio/utils/util-app-copy-and-paste';
import { AppDropHandleDirective } from '@portifolio/utils/util-app-drop-handle';
import { FolderHandleComponent } from '@portifolio/utils/util-folder-handle';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { IApp } from '@portifolio/utils/util-models';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-holder',
  templateUrl: './app-holder.component.html',
  styleUrls: ['./app-holder.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    FolderHandleComponent,
    AppDropHandleDirective,
    OpenContextMenuDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[id]': 'parentFolderId()',
  },
  hostDirectives: [
    {
      directive: HandleCopyAndPasteEventsDirective,
      inputs: ['parentFolderId', 'id'],
    },
  ],
})
export class AppHolderComponent implements OnInit {
  id = input.required<number>();
  parentFolderId = input.required<string>();
  files$$?: Observable<IApp[]>;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
  ) {}

  ngOnInit(): void {
    this.files$$ = this.foldersHierarchyFacade
      .getFileByFolder$(this.id())
      .pipe(tap(() => this.cdr.detectChanges()));
  }
}
