import { DestroyRef, Directive, ElementRef, OnInit } from '@angular/core';
import { ElementsFacade } from '@portifolio/features/feature-page-creator';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { PROGRAM_2_CONFIG } from '../../mocks/program-mocks';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IFolderData } from '@portifolio/utils/util-models';
import { MenuEventsFacade } from '../../facades/menu-events-facade';

@Directive({
  selector: '[handleFolderShortcut]',
  standalone: true,
})
export class HandleFolderShortcutDirective implements OnInit {
  explorerConfig = PROGRAM_2_CONFIG.config;

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly menuEventsFacade: MenuEventsFacade,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly elementsFacade: ElementsFacade<IFolderData>,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
  ) {}

  imgSrc = '';
  pageTitle = '';
  folderId = -1;

  ngOnInit(): void {
    const element = this.elementRef.nativeElement;
    const img = element.querySelector('img') as HTMLImageElement;
    const p = element.querySelector('p') as HTMLElement;

    this.imgSrc = img.src;
    this.pageTitle = p.innerText;

    const folder = this.foldersHierarchyFacade.createFolder(this.pageTitle);

    if (folder) this.folderId = folder?.id;

    this.createSubscriptions();
  }

  createSubscriptions() {
    fromEvent(this.elementRef.nativeElement, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
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
