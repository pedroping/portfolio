import { Directive, input, OnInit, OutputEmitterRef } from '@angular/core';
import { NewAppComponent } from '@portifolio/features/feature-app-icon';
import { ContextMenuFacade } from '@portifolio/features/feature-context-menus';
import { filter } from 'rxjs';
import { FolderHandleComponent } from '../../folder-handle/folder-handle.component';
import { VIEW_CLASS } from '../../mocks/folder-events-mocks';

@Directive({
  selector: '[handleFolderNewEvent]',
  standalone: true,
})
export class HandleFolderNewEventDirective implements OnInit {
  folderId = input.required<number>();
  parentId = input.required<string | number>();

  constructor(
    private readonly contextMenuFacade: ContextMenuFacade<number>,
    private readonly folderHandleComponent: FolderHandleComponent,
  ) {}

  ngOnInit(): void {
    this.contextMenuFacade
      .getEventByOption('new-folder')
      .pipe(filter((event) => event.parentId == this.parentId()))
      .subscribe(() => {
        const vcr = this.folderHandleComponent.vcr();

        if (!vcr) return;

        vcr.clear();

        const { instance, location } = vcr.createComponent(NewAppComponent);

        const appClass = this.folderHandleComponent.lastOption
          ? VIEW_CLASS[this.folderHandleComponent.lastOption]
          : '';
        const view = location.nativeElement as HTMLElement;
        if (appClass) view.classList.add(appClass);

        this.createViewSubscriptions(instance.createEvent);
      });
  }

  createViewSubscriptions(event: OutputEmitterRef<unknown>) {
    event.subscribe(() => {
      this.folderHandleComponent.vcr()?.clear();
    });
  }
}
