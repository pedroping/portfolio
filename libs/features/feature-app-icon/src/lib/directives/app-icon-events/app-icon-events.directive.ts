import {
  DestroyRef,
  Directive,
  ElementRef,
  input,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ContextMenuFacade,
  OpenContextMenuDirective,
} from '@portifolio/features/feature-context-menus';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { IApp, IOptionEvent } from '@portifolio/utils/util-models';
import { filter, Observable, pipe } from 'rxjs';
import { PageHandleDirective } from '../page-handle/page-handle.directive';

@Directive({
  selector: '[appIconEvents]',
  standalone: true,
  hostDirectives: [
    {
      directive: OpenContextMenuDirective,
      inputs: ['openContextMenu', 'id'],
    },
  ],
})
export class AppIconEventsDirective implements OnInit {
  config = input.required<IApp>();
  parentId = this.elementRef.nativeElement.parentElement?.id;

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly pageHandleDirective: PageHandleDirective,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
    private readonly contextMenuFacade: ContextMenuFacade<string | number>,
  ) {}

  ngOnInit(): void {
    this.parentId = this.elementRef.nativeElement.parentElement?.id;
    this.deleteEvent$.subscribe(() => this.handleDelete());
    this.openEvent$.subscribe(() => this.pageHandleDirective.onClick());
  }

  handleDelete() {
    const isFolderId = this.config().isFolderId;

    if ((this.config().type == 'folder' && isFolderId) || isFolderId == 0)
      this.foldersHierarchyFacade.deleteFolder(isFolderId);

    this.foldersHierarchyFacade.deleteFile(this.config().id);
  }

  get deleteEvent$() {
    return this.contextMenuFacade
      .getEventByOption('program-delete', this.parentId)
      .pipe(this.destroy, this.filterEvent);
  }

  get exploreEvent$() {
    return this.contextMenuFacade
      .getEventByOption('program-explore', this.parentId)
      .pipe(this.destroy, this.filterEvent);
  }

  get openEvent$() {
    return this.contextMenuFacade
      .getEventByOption('program-open', this.parentId)
      .pipe(this.destroy, this.filterEvent);
  }

  get filterEvent() {
    return pipe(
      filter(
        (event: IOptionEvent<string | number>) =>
          event.data === this.config().id,
      ),
    );
  }

  get destroy() {
    return pipe<
      Observable<IOptionEvent<string | number>>,
      Observable<IOptionEvent<string | number>>
    >(takeUntilDestroyed(this.destroyRef));
  }
}
