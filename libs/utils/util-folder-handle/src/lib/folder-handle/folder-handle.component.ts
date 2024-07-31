import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  forwardRef,
  Host,
  Inject,
  input,
  viewChild,
  viewChildren,
  ViewContainerRef,
} from '@angular/core';
import { AppIconComponent } from '@portifolio/features/feature-app-icon';
import { HandleCopyAndPasteEventsDirective } from '@portifolio/utils/util-app-copy-and-paste';
import { IApp } from '@portifolio/utils/util-models';
import { BehaviorSubject, Observable } from 'rxjs';
import { HandleFolderShortEventDirective } from '../directives/handle-folder-short-event/handle-folder-short-event.directive';
import { HandleFolderViewEventDirective } from '../directives/handle-folder-view-event/handle-folder-view-event.directive';
import { FILE_TOKEN, getTokenObservable$ } from '../mocks/file-token';
import { HandleFolderRefreshEventDirective } from '../directives/handle-folder-refresh-event/handle-folder-refresh-event.directive';
import { HandleFolderNewEventDirective } from '../directives/handle-folder-new-event/handle-folder-new-event.directive';
@Component({
  selector: 'folder-handle',
  templateUrl: './folder-handle.component.html',
  styleUrls: ['./folder-handle.component.scss'],
  standalone: true,
  host: {
    '[id]': 'parentId()',
  },
  imports: [AppIconComponent, AsyncPipe],
  hostDirectives: [
    {
      directive: HandleFolderShortEventDirective,
      inputs: ['folderId', 'parentId'],
    },
    {
      directive: HandleCopyAndPasteEventsDirective,
      inputs: ['folderId', 'parentId'],
    },
    {
      directive: HandleFolderViewEventDirective,
      inputs: ['folderId', 'parentId'],
    },
    {
      directive: HandleFolderRefreshEventDirective,
      inputs: ['folderId', 'parentId'],
    },
    {
      directive: HandleFolderNewEventDirective,
      inputs: ['folderId', 'parentId'],
    },
  ],
  providers: [
    {
      provide: FILE_TOKEN,
      useFactory: forwardRef(() => new BehaviorSubject<IApp[]>([])),
    },
  ],
})
export class FolderHandleComponent {
  folderId = input.required<number>();
  parentId = input.required<string | number>();

  files$: Observable<IApp[]>;
  apps = viewChildren(AppIconComponent);
  vcr = viewChild('vcr', { read: ViewContainerRef });
  lastOption?: string;
  
  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly destroyRef: DestroyRef,
    @Host()
    @Inject(FILE_TOKEN)
    private readonly fileToken: BehaviorSubject<IApp[]>,
  ) {
    this.files$ = getTokenObservable$(
      this.fileToken,
      this.destroyRef,
      this.cdr,
    );
  }
}
