import {
  computed,
  DestroyRef,
  Directive,
  ElementRef,
  input,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContextMenuFacade } from '@portifolio/features/feature-context-menus';
import { ElementsFacade } from '@portifolio/features/feature-page-creator';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { IApp, IFolderData, IOptionEvent } from '@portifolio/utils/util-models';
import { filter, Observable, pipe } from 'rxjs';

@Directive({
  selector: '[appIconEvents]',
  standalone: true,
})
export class AppIconEventsDirective implements OnInit {
  config = input.required<IApp>();
  id = computed(() => this.config().id);

  deleteEvent$ = new Observable<IOptionEvent<string | number>>();

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly elementsFacade: ElementsFacade<IFolderData>,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
    private readonly contextMenuFacade: ContextMenuFacade<string | number>,
  ) {}

  ngOnInit(): void {
    const parentId = this.elementRef.nativeElement.parentElement?.id;

    this.deleteEvent$ = this.contextMenuFacade
      .getEventByOption('program-delete', parentId)
      .pipe(this.destroy, this.filterEvent);

    this.deleteEvent$.subscribe(() => this.handleDelete());
  }

  get filterEvent() {
    return pipe(
      filter(
        (event: IOptionEvent<string | number>) => event.data === this.id(),
      ),
    );
  }

  get destroy() {
    return pipe<
      Observable<IOptionEvent<string | number>>,
      Observable<IOptionEvent<string | number>>
    >(takeUntilDestroyed(this.destroyRef));
  }

  handleDelete() {
    this.foldersHierarchyFacade.deleteFile(this.id());
    const isFolderId = this.config().isFolderId;
    const hasPageId = this.config().hasPageId;

    if (hasPageId || hasPageId == 0)
      this.elementsFacade.destroyElement(hasPageId);

    if (this.config().type != 'folder' || (!isFolderId && isFolderId != 0))
      return;

    this.foldersHierarchyFacade.deleteFolder(isFolderId);
    this.foldersHierarchyFacade.deleteFilesByFolder(isFolderId);
  }
}
