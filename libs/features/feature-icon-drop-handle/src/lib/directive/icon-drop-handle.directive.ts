import {
  DestroyRef,
  Directive,
  ElementRef,
  input,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppIconComponent } from '@portifolio/features/feature-app-icon';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { IApp } from '@portifolio/utils/util-models';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[iconDropHandle]',
  standalone: true,
})
export class IconDropHandleDirective {
  folderId = input.required<number>({ alias: 'iconDropHandle' });

  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly destroyRef: DestroyRef,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
  ) {}

  ngOnInit(): void {
    const parentElement = this.elementRef.nativeElement.parentElement;
    if (!parentElement) return;

    fromEvent<DragEvent>(parentElement, 'drop')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => this.onDrop(event));

    fromEvent<DragEvent>(parentElement, 'dragover')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => this.onOver(event));
  }

  onDrop(event: DragEvent) {
    event.stopPropagation();
    const eventData = event.dataTransfer?.getData('text');

    if (!eventData) return;

    const dropContent = JSON.parse(eventData) as IApp;
    const actualId = this.elementRef.nativeElement.parentElement?.id;
    const folderId = this.folderId();

    if (
      actualId == dropContent.parentTargetId ||
      dropContent.parentFolderId == folderId ||
      dropContent.isFolderId === folderId
    )
      return;

    if (dropContent.isFolderId || dropContent.isFolderId == 0) {
      const hasSameChild = this.foldersHierarchyFacade.hasSameChild(
        dropContent.isFolderId,
        folderId,
      );

      if (hasSameChild) return;

      this.foldersHierarchyFacade.changeFolderId(dropContent.id, folderId);
      this.foldersHierarchyFacade.moveFolder(dropContent.isFolderId, folderId);
      return;
    }

    this.foldersHierarchyFacade.changeFolderId(dropContent.id, folderId);
  }

  onOver(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
  }

  createFolder(dropContent: IApp) {
    const compoent = this.vcr.createComponent(AppIconComponent);
    compoent.setInput('config', dropContent);
    compoent.setInput('id', dropContent.id);
  }
}
