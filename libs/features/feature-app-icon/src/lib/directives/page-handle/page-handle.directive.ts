import {
  DestroyRef,
  Directive,
  ElementRef,
  HostListener,
  input,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContextMenuFacade } from '@portifolio/features/feature-context-menus';
import { ElementsFacade } from '@portifolio/features/feature-page-creator';
import { AppDropHandleDirective } from '@portifolio/utils/util-app-drop-handle';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { IApp, IFolderData } from '@portifolio/utils/util-models';
import { filter, take } from 'rxjs';

@Directive({
  selector: '[pageHandle]',
  standalone: true,
  hostDirectives: [
    { directive: AppDropHandleDirective, inputs: ['dropHandle', 'config'] },
  ],
})
export class PageHandleDirective implements OnInit {
  config = input.required<IApp>();
  parentId = this.elementRef.nativeElement.parentElement?.id;

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
    private readonly elementsFacade: ElementsFacade<IFolderData | undefined>,
    private readonly contextMenuFacade: ContextMenuFacade<string | number>,
  ) {}

  @HostListener('dblclick') onClick() {
    const pageConfigId = this.config().pageConfigId;

    if (pageConfigId || pageConfigId == 0)
      return this.handlePageId(pageConfigId);

    const initialConfig = this.config().initialPageConfig;

    if (!initialConfig) return;

    initialConfig.name = this.config().name;

    if (this.config().type == 'folder') {
      const isFolderId = this.config().isFolderId;

      if (!isFolderId) return;

      const pageConfig = this.elementsFacade.createElement(
        {
          folderId: isFolderId,
        },
        initialConfig,
      );

      this.config().pageConfigId = pageConfig.id;
      this.createPageEvents();
      return;
    }

    const pageConfig = this.elementsFacade.createElement(
      undefined,
      initialConfig,
    );
    this.config().pageConfigId = pageConfig.id;
    this.createPageEvents();
  }

  ngOnInit(): void {
    this.parentId = this.elementRef.nativeElement.parentElement?.id;
    this.openEvent$.subscribe(() => this.onClick());
    this.createPageEvents();
    this.createFolder();
  }

  createFolder() {
    if (this.config().type != 'folder') return;

    if (!this.config().isFolderId && this.config().isFolderId != 0) {
      const folder = this.foldersHierarchyFacade.createFolder(
        this.config().name,
        this.config().parentFolderId == 0
          ? undefined
          : this.config().parentFolderId,
      );
      if (!folder) return;

      this.config().isFolderId = folder?.id;
    }
  }

  handlePageId(id: number) {
    this.elementsFacade.validateElementOpened(id);
  }

  createPageEvents() {
    const pageConfigId = this.config().pageConfigId;

    if (!pageConfigId && pageConfigId != 0) return;

    const pageConfig = this.elementsFacade.getElement(pageConfigId);

    if (!pageConfig) return;

    pageConfig.onDestroy$
      .pipe(takeUntilDestroyed(this.destroyRef), take(1))
      .subscribe(() => {
        this.config().pageConfigId = undefined;
      });
  }

  get openEvent$() {
    return this.contextMenuFacade
      .getEventByOption('program-open', this.parentId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((event) => event.data === this.config().id),
      );
  }
}
