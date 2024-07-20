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

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
    private readonly contextMenuFacade: ContextMenuFacade<string | number>,
  ) {}

  ngOnInit(): void {
    this.deleteEvent$.subscribe(() => this.handleDelete());
  }

  handleDelete() {
    const isFolderId = this.config().isFolderId;

    if ((this.config().type == 'folder' && isFolderId) || isFolderId == 0)
      this.foldersHierarchyFacade.deleteFolder(isFolderId);

    this.foldersHierarchyFacade.deleteFile(this.config().id);
  }

  get deleteEvent$() {
    const parentId = this.elementRef.nativeElement.parentElement?.id;
    return this.contextMenuFacade
      .getEventByOption('program-delete', parentId)
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
