import {
  DestroyRef,
  Directive,
  HostListener,
  input,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ElementsFacade } from '@portifolio/features/feature-page-creator';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { IApp, IFolderData } from '@portifolio/utils/util-models';
import { take } from 'rxjs';

@Directive({
  selector: '[pageHandle]',
  standalone: true,
})
export class PageHandleDirective implements OnInit {
  config = input.required<IApp>();

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
    private readonly elementsFacade: ElementsFacade<IFolderData | undefined>,
  ) {}

  @HostListener('dblclick') onClick() {
    const pageConfigId = this.config().pageConfigId;

    if (pageConfigId || pageConfigId == 0)
      return this.handlePageId(pageConfigId);

    const initialConfig = this.config().initialPageConfig;

    if (!initialConfig) return;

    initialConfig.name = this.config().name;

    if (this.config().type == 'folder') {
      if (!this.config().isFolderId && this.config().isFolderId != 0) {
        const folder = this.foldersHierarchyFacade.createFolder(
          this.config().name,
        );
        if (!folder) return;

        this.config().isFolderId = folder?.id;
      }

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
    this.createPageEvents();
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
}
