import {
  DestroyRef,
  Directive,
  ElementRef,
  input,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FoldersHierarchyFacade } from '@portifolio/utils/util-folders-hierarchy-data';
import { IApp } from '@portifolio/utils/util-models';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[dropHandle]',
  standalone: true,
})
export class AppDropHandleDirective implements OnInit {
  config = input<IApp>();
  useParent = input<boolean>();
  folderId = input<number | undefined>(undefined, { alias: 'dropHandle' });

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly foldersHierarchyFacade: FoldersHierarchyFacade,
  ) {}

  ngOnInit(): void {
    const parentElement = this.useParent()
      ? this.elementRef.nativeElement.parentElement
      : this.elementRef.nativeElement;

    if (!parentElement) return;

    fromEvent<DragEvent>(parentElement, 'drop')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => this.onDrop(event));

    fromEvent<DragEvent>(parentElement, 'dragover')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => this.onOver(event));
  }

  onDrop(event: DragEvent) {
    event.stopImmediatePropagation();

    const eventData = event.dataTransfer?.getData('text');

    if (!eventData) return;

    const dropContent = JSON.parse(eventData) as IApp;

    const folderId = this.folderId() ?? this.config()?.isFolderId;

    this.moveElement(dropContent, folderId);
  }

  moveElement(dropContent: IApp, folderId?: number) {
    if (!folderId && folderId != 0) return;

    if (
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
}
