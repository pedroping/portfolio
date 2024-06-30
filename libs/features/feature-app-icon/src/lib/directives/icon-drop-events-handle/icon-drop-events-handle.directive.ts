import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  input,
} from '@angular/core';
import { IApp } from '@portifolio/utils/util-models';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[iconDropEventsHandle]',
  standalone: true,
})
export class IconDropEventsHandleDirective implements AfterViewInit {
  config = input.required<IApp>();

  constructor(private readonly elementRef: ElementRef) {}

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent) {
    if (!event?.dataTransfer) return;

    const id = this.elementRef.nativeElement.parentElement?.id || '';

    event.dataTransfer.setData(
      'text',
      JSON.stringify({ ...this.config(), parentTargetId: id })
    );
    event.dataTransfer.effectAllowed = 'move';
  }

  ngAfterViewInit(): void {
    const parentElement = this.elementRef.nativeElement.parentElement;

    if (!parentElement) return;

    fromEvent<DragEvent>(parentElement, 'dragover').subscribe((event) => {
      event.preventDefault();
      
      if (!event?.dataTransfer) return;

      event.dataTransfer.dropEffect = 'move';
    });
  }
}
