import {
  DestroyRef,
  Directive,
  ElementRef,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ITransferData } from '@portifolio/utils/util-models';
import { fromEvent } from 'rxjs';
import { AppIconComponent } from '../../ui/app-icon.component';
import { DropEventsService } from '../../services/drop-events.service';

@Directive({
  selector: '[appDropHandle]',
  standalone: true,
})
export class AppDropHandleDirective implements OnInit {
  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly destroyRef: DestroyRef,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly dropEventsService: DropEventsService
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

    const dropContent = JSON.parse(eventData) as ITransferData;

    const actualId = this.elementRef.nativeElement.parentElement?.id;

    if (actualId == dropContent.parentTargetId) return;

    this.dropEventsService.setDropEvent({
      id: dropContent.id,
      parentTargetId: dropContent.parentTargetId,
    });
    this.createFolder(dropContent);
  }

  onOver(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
  }

  createFolder(dropContent: ITransferData) {
    const compoent = this.vcr.createComponent(AppIconComponent);
    compoent.setInput('config', dropContent);
    compoent.setInput('id', dropContent.id);
  }
}
