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

@Directive({
  selector: '[appDropHandle]',
  standalone: true,
})
export class AppDropHandleDirective<T> implements OnInit {
  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly destroyRef: DestroyRef,
    private readonly elementRef: ElementRef<HTMLElement>
  ) {}

  ngOnInit(): void {
    const parentElement = this.elementRef.nativeElement.parentElement;
    if (!parentElement) return;

    fromEvent<DragEvent>(parentElement, 'drop')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(this.onDrop.bind(this));

    fromEvent<DragEvent>(parentElement, 'dragover')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(this.onOver.bind(this));
  }

  onDrop(event: DragEvent) {
    event.stopPropagation();
    const dropContent = JSON.parse(
      event.dataTransfer?.getData('text') ?? ''
    ) as ITransferData<T>;

    const actualId = this.elementRef.nativeElement.parentElement?.id;

    if (actualId != dropContent.parentTargetId) this.createFolder(dropContent);
  }

  onOver(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
  }

  createFolder(dropContent: ITransferData<T>) {
    const compoent = this.vcr.createComponent(AppIconComponent);
    compoent.setInput('config', dropContent);
    compoent.setInput('data', dropContent.data);
  }
}
