import {
  contentChild,
  DestroyRef,
  Directive,
  ElementRef,
  Inject,
  OnInit,
  Optional,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ElementsFacade } from '@portifolio/features/feature-page-creator';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import {
  CONFIG_TOKEN,
  DATA_TOKEN,
  IFolderData,
  IPageConfig,
} from '@portifolio/utils/util-models';
import { fromEvent } from 'rxjs';
import {
  DESKTOP_ICON,
  DESKTOP_ID,
  FOLDER_MOCK,
} from '../../mocks/file-explorer-mocks';

@Directive({
  selector: '[backForwardHandle]',
  standalone: true,
})
export class BackForwardHandleDirective implements OnInit {
  backBtn = contentChild<ElementRef<HTMLElement>>('back');
  fowardBtn = contentChild<ElementRef<HTMLElement>>('forward');

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly elementsFacade: ElementsFacade<IFolderData>,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
    @Optional() @Inject(DATA_TOKEN) private readonly data: IFolderData,
    @Optional() @Inject(CONFIG_TOKEN) private readonly pageConfig: IPageConfig,
  ) {}

  ngOnInit(): void {
    const backBtn = this.backBtn()?.nativeElement;
    const fowardBtn = this.fowardBtn()?.nativeElement;

    if (!backBtn || !fowardBtn) return;

    fromEvent(backBtn, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.back());

    fromEvent(fowardBtn, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.foward());
  }

  back() {
    if (!this.data || this.data.folderId == DESKTOP_ID) return;

    const folderFile = this.foldersHierarchyFacade.getFolderFile(
      this.data.folderId,
    );

    if (!folderFile) return;

    const parentFolderId = folderFile.parentFolderId;

    const allFiles =
      this.foldersHierarchyFacade.getFileByFolder(parentFolderId);

    const filteredFiles = allFiles.filter(
      (file) => file.type == 'folder' && file.id != folderFile.id,
    );

    const actualFolderId = allFiles.findIndex(
      (file) => file.id == folderFile.id,
    );

    const hasBefore = filteredFiles.find((file) => {
      const fileIndex = allFiles.findIndex((file2) => file2.id == file.id);

      return fileIndex != -1 && fileIndex < actualFolderId;
    });

    if (hasBefore && hasBefore.initialPageConfig) {
      const pageConfig = hasBefore.initialPageConfig;

      pageConfig.customX = this.pageConfig.lastPosition.x;
      pageConfig.customY = this.pageConfig.lastPosition.y;
      pageConfig.icon = hasBefore.logo;

      this.elementsFacade.createElement(
        { folderId: hasBefore.isFolderId ?? -1 },
        pageConfig,
      );

      this.elementsFacade.destroyElement(this.pageConfig.id);
      return;
    }

    const pageConfig = FOLDER_MOCK;

    pageConfig.customX = this.pageConfig.lastPosition.x;
    pageConfig.customY = this.pageConfig.lastPosition.y;
    pageConfig.icon = DESKTOP_ICON;

    this.elementsFacade.createElement({ folderId: DESKTOP_ID }, pageConfig);
    this.elementsFacade.destroyElement(this.pageConfig.id);
  }

  foward() {
    if (!this.data) return;

    if (this.data.folderId == DESKTOP_ID) {
      const allFiles = this.foldersHierarchyFacade
        .getFileByFolder(DESKTOP_ID)
        .filter((file) => file.type == 'folder' && file.id != DESKTOP_ID);

      const fisrtFile = allFiles[0];

      if (!fisrtFile) return;

      const pageConfig = fisrtFile.initialPageConfig;

      if (!pageConfig) return;

      pageConfig.customX = this.pageConfig.lastPosition.x;
      pageConfig.customY = this.pageConfig.lastPosition.y;
      pageConfig.icon = fisrtFile.logo;

      this.elementsFacade.createElement(
        { folderId: fisrtFile.isFolderId ?? -1 },
        pageConfig,
      );
      this.elementsFacade.destroyElement(this.pageConfig.id);

      return;
    }

    const folderFile = this.foldersHierarchyFacade.getFolderFile(
      this.data.folderId,
    );

    if (!folderFile) return;

    const parentFolderId = folderFile.parentFolderId;

    const allFiles =
      this.foldersHierarchyFacade.getFileByFolder(parentFolderId);

    const filteredFiles = allFiles.filter(
      (file) => file.type == 'folder' && file.id != folderFile.id,
    );

    const actualFolderId = allFiles.findIndex(
      (file) => file.id == folderFile.id,
    );

    const hasAfter = filteredFiles.find((file) => {
      const fileIndex = allFiles.findIndex((file2) => file2.id == file.id);

      return fileIndex != -1 && fileIndex > actualFolderId;
    });

    if (hasAfter && hasAfter.initialPageConfig) {
      const pageConfig = hasAfter.initialPageConfig;

      pageConfig.customX = this.pageConfig.lastPosition.x;
      pageConfig.customY = this.pageConfig.lastPosition.y;
      pageConfig.icon = hasAfter.logo;

      this.elementsFacade.createElement(
        { folderId: hasAfter.isFolderId ?? -1 },
        pageConfig,
      );

      this.elementsFacade.destroyElement(this.pageConfig.id);
      return;
    }
  }
}
