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
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { IApp, IOptionEvent } from '@portifolio/utils/util-models';
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
    const isFolderId = this.config().isFolderId;

    if ((this.config().type == 'folder' && isFolderId) || isFolderId == 0)
      this.foldersHierarchyFacade.deleteFolder(isFolderId);

    this.foldersHierarchyFacade.deleteFile(this.id());
  }
}
