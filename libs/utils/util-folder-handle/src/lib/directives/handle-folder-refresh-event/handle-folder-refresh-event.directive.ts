import { Directive, Host, Inject, input, OnInit } from '@angular/core';
import { ContextMenuFacade } from '@portifolio/features/feature-context-menus';
import { IApp } from '@portifolio/utils/util-models';
import { BehaviorSubject, filter, switchMap, tap, timer } from 'rxjs';
import { FILE_TOKEN } from '../../mocks/file-token';

@Directive({
  selector: '[handleFolderRefreshEvent]',
  standalone: true,
})
export class HandleFolderRefreshEventDirective implements OnInit {
  folderId = input.required<number>();
  parentId = input.required<string | number>();

  oldApps: IApp[] = [];

  constructor(
    private readonly contextMenuFacade: ContextMenuFacade<number>,
    @Host()
    @Inject(FILE_TOKEN)
    private readonly fileToken: BehaviorSubject<IApp[]>,
  ) {}

  ngOnInit(): void {
    this.creatFileObservables();
  }

  creatFileObservables() {
    this.contextMenuFacade
      .getEventByOption('refresh-icons')
      .pipe(
        filter((event) => event.parentId == this.parentId()),
        tap(() => {
          this.oldApps = this.fileToken.value;
          this.fileToken.next([]);
        }),
        switchMap(() => timer(200)),
      )
      .subscribe(() => {
        this.fileToken.next(this.oldApps);
      });
  }
}
