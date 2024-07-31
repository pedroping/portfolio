import { Directive, Host, Inject, input, OnInit } from '@angular/core';
import { ContextMenuFacade } from '@portifolio/features/feature-context-menus';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { IApp, IOptionEvent } from '@portifolio/utils/util-models';
import { BehaviorSubject, filter, map, startWith, switchMap } from 'rxjs';
import { FILE_TOKEN } from '../../mocks/file-token';
import { SHORT_FOLDER_EVENTS } from '../../mocks/folder-events-mocks';

@Directive({
  selector: '[handleFolderShortEvent]',
  standalone: true,
})
export class HandleFolderShortEventDirective implements OnInit {
  folderId = input.required<number>();
  parentId = input.required<string | number>();

  constructor(
    private readonly contextMenuFacade: ContextMenuFacade<number>,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
    @Host()
    @Inject(FILE_TOKEN)
    private readonly fileToken: BehaviorSubject<IApp[]>,
  ) {}

  ngOnInit(): void {
    this.creatFileObservables();
  }

  creatFileObservables() {
    this.contextMenuFacade.optionSelected$$
      .pipe(
        filter(
          (event) =>
            SHORT_FOLDER_EVENTS.includes(event.option) &&
            event.parentId == this.parentId(),
        ),
        startWith(null),
        switchMap((event) => {
          return this.foldersHierarchyFacade
            .getFileByFolder$(this.folderId())
            .pipe(map((files) => this.shortFiles(event, files)));
        }),
      )
      .subscribe((files) => this.fileToken.next(files));
  }

  shortFiles(event: IOptionEvent<number> | null, files: IApp[]) {
    if (!event) return files;

    if (event.option == 'short-by-name')
      return files.sort((a, b) => a.name.localeCompare(b.name));

    if (event.option == 'short-by-size') {
      const allFolders = files
        .filter((file) => file.type == 'folder')
        .map((file) => {
          const childrens = this.foldersHierarchyFacade.getFileByFolder(
            file.isFolderId ?? -1,
          ).length;

          return {
            file: file,
            childrens: childrens,
          };
        })
        .sort((a, b) => b.childrens - a.childrens)
        .map((file) => file.file);

      const allFiles = files
        .filter((file) => file.type == 'file')
        .sort((a, b) => a.name.localeCompare(b.name));

      return [...allFolders, ...allFiles];
    }

    return files;
  }
}
