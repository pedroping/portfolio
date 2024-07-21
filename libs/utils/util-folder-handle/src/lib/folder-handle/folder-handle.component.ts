import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Component, input, OnInit } from '@angular/core';
import { AppIconComponent } from '@portifolio/features/feature-app-icon';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { IApp } from '@portifolio/utils/util-models';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'folder-handle',
  templateUrl: './folder-handle.component.html',
  styleUrls: ['./folder-handle.component.scss'],
  standalone: true,
  host: {
    '[id]': 'parentId()',
  },
  imports: [AppIconComponent, AsyncPipe],
})
export class FolderHandleComponent implements OnInit {
  folderId = input.required<number>();
  parentId = input.required<string | number>();

  files$ = new Observable<IApp[]>();

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
  ) {}

  ngOnInit(): void {
    this.files$ = this.foldersHierarchyFacade
      .getFileByFolder(this.folderId())
      .pipe(tap(() => this.cdr.detectChanges()));
  }
}
