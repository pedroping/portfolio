import { Directive, effect, input, OnInit } from '@angular/core';
import { ContextMenuFacade } from '@portifolio/features/feature-context-menus';
import { filter } from 'rxjs';
import { FolderHandleComponent } from '../../folder-handle/folder-handle.component';
import {
  VIEW_CLASS,
  VIEW_FOLDER_EVENTS,
} from '../../mocks/folder-events-mocks';

@Directive({
  selector: '[handleFolderViewEvent]',
  standalone: true,
})
export class HandleFolderViewEventDirective implements OnInit {
  folderId = input.required<number>();
  parentId = input.required<string | number>();
  lastOption?: string;

  constructor(
    private readonly contextMenuFacade: ContextMenuFacade<number>,
    private readonly folderHandleComponent: FolderHandleComponent,
  ) {
    effect(() => {
      const apps = this.folderHandleComponent.apps();

      if (this.lastOption && apps.length > 0) {
        this.handleEvent(this.lastOption);
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
    this.lastOption = event;
    const appClass = VIEW_CLASS[event];

    this.folderHandleComponent.apps().forEach((app) => {
      Object.keys(VIEW_CLASS).forEach((key) => {
        app.elementRef.nativeElement.classList.remove(VIEW_CLASS[key]);
      });

      app.elementRef.nativeElement.classList.add(appClass);
    });
  }
}
