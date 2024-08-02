import {
  Directive,
  input,
  OnInit,
  OutputEmitterRef,
  ViewRef,
} from '@angular/core';
import { NewAppComponent } from '@portifolio/features/feature-app-icon';
import { ContextMenuFacade } from '@portifolio/features/feature-context-menus';
import { filter } from 'rxjs';
import { FolderHandleComponent } from '../../components/folder-handle/folder-handle.component';
import { FileExplorerFacade } from '../../facade/file-explorer-facade.service';
import { VIEW_CLASS } from '../../mocks/folder-events-mocks';

@Directive({
  selector: '[handleFolderNewEvent]',
  standalone: true,
})
export class HandleFolderNewEventDirective implements OnInit {
  folderId = input.required<number>();
  parentId = input.required<string | number>();

  constructor(
    private readonly fileExplorerFacade: FileExplorerFacade,
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

        const { instance, location, hostView } =
          vcr.createComponent(NewAppComponent);

        const appClass = this.folderHandleComponent.lastOption
          ? VIEW_CLASS[this.folderHandleComponent.lastOption]
          : '';
        const view = location.nativeElement as HTMLElement;

        if (appClass) view.classList.add(appClass);

        this.createViewSubscriptions(instance.createEvent, hostView);
      });
  }

  createViewSubscriptions(event: OutputEmitterRef<string>, hostView: ViewRef) {
    event.subscribe((value) => {
      const index = this.folderHandleComponent.vcr()?.indexOf(hostView);
      if (index != undefined) this.folderHandleComponent.vcr()?.remove(index);
      this.fileExplorerFacade.createFile(value, this.folderId());
    });
  }
}
