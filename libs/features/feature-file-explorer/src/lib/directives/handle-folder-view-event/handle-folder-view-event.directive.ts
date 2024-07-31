import { Directive, effect, input, OnInit } from '@angular/core';
import { ContextMenuFacade } from '@portifolio/features/feature-context-menus';
import { filter } from 'rxjs';
import {
  VIEW_FOLDER_EVENTS,
  VIEW_CLASS,
} from '../../mocks/folder-events-mocks';
import { FolderHandleComponent } from '../../components/folder-handle/folder-handle.component';

@Directive({
  selector: '[handleFolderViewEvent]',
  standalone: true,
})
export class HandleFolderViewEventDirective implements OnInit {
  folderId = input.required<number>();
  parentId = input.required<string | number>();

  constructor(
    private readonly contextMenuFacade: ContextMenuFacade<number>,
    private readonly folderHandleComponent: FolderHandleComponent,
  ) {
    effect(() => {
      const apps = this.folderHandleComponent.apps();

      if (this.folderHandleComponent.lastOption && apps.length > 0) {
        this.handleEvent(this.folderHandleComponent.lastOption);
      }
    });
  }

  ngOnInit(): void {
    this.creatFileObservables();
  }

  creatFileObservables() {
    this.contextMenuFacade.optionSelected$$
      .pipe(
        filter(
          (event) =>
            VIEW_FOLDER_EVENTS.includes(event.option) &&
            event.parentId == this.parentId(),
        ),
      )
      .subscribe((event) => this.handleEvent(event.option));
  }

  handleEvent(event: string) {
    this.folderHandleComponent.lastOption = event;
    const appClass = VIEW_CLASS[event];

    this.folderHandleComponent.apps().forEach((app) => {
      Object.keys(VIEW_CLASS).forEach((key) => {
        app.elementRef.nativeElement.classList.remove(VIEW_CLASS[key]);
      });

      app.elementRef.nativeElement.classList.add(appClass);
    });
  }
}
