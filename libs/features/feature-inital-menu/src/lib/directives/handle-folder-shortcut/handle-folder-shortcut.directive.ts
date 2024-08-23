import {
  DestroyRef,
  Directive,
  ElementRef,
  input,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ElementsFacade } from '@portifolio/features/feature-page-creator';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { IFolderData } from '@portifolio/utils/util-models';
import { fromEvent } from 'rxjs';
import { MenuEventsFacade } from '../../facades/menu-events-facade';
import {
  DESKTOP_CONFIG,
  INITALfOLDER_APPS,
  PROGRAM_2_CONFIG,
  RECYCLE_FOLDER,
} from '../../mocks/program-mocks';
import { TrashHandle } from '@portifolio/utils/util-trash-handle';

@Directive({
  selector: '[handleFolderShortcut]',
  standalone: true,
})
export class HandleFolderShortcutDirective implements OnInit {
  explorerConfig = PROGRAM_2_CONFIG.config;
  isDesktop = input<boolean>();
  isTrash = input<boolean>();

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly trashHandle: TrashHandle,
    private readonly menuEventsFacade: MenuEventsFacade,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly elementsFacade: ElementsFacade<IFolderData>,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
  ) {}

  imgSrc = '';
  pageTitle = '';
  folderId = -1;

  ngOnInit(): void {
    if (this.isDesktop() || this.isTrash()) return this.createSubscriptions();

    const element = this.elementRef.nativeElement;
    const img = element.querySelector('img') as HTMLImageElement;
    const p = element.querySelector('p') as HTMLElement;

    this.imgSrc = img.src;
    this.pageTitle = p.innerText;

    const folder = this.foldersHierarchyFacade.createFolder(
      this.pageTitle,
      this.imgSrc,
    );

    if (folder) this.folderId = folder?.id;

    const apps = INITALfOLDER_APPS[this.pageTitle];

    apps?.forEach((app) => {
      app.parentFolderId = this.folderId;
      this.foldersHierarchyFacade.setNewFile(app);
    });

    this.createSubscriptions();
  }

  createSubscriptions() {
    fromEvent(this.elementRef.nativeElement, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.isTrash()) {
          this.elementsFacade.createElement(
            { folderId: this.trashHandle.folderId },
            RECYCLE_FOLDER,
          );
          this.menuEventsFacade.setCloseMenu();
          return;
        }

        if (this.isDesktop()) {
          if (!DESKTOP_CONFIG.data) return;

          this.elementsFacade.createElement(
            DESKTOP_CONFIG.data,
            DESKTOP_CONFIG.config,
          );
          this.menuEventsFacade.setCloseMenu();
          return;
        }

        if (this.folderId == -1) return;

        this.explorerConfig.icon = this.imgSrc;
        this.explorerConfig.name = this.pageTitle;

        this.elementsFacade.createElement(
          { folderId: this.folderId },
          this.explorerConfig,
        );
        this.menuEventsFacade.setCloseMenu();
      });
  }
}
