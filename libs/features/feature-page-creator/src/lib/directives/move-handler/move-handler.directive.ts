import { Directive, ElementRef, Inject, OnInit } from '@angular/core';
import { CONFIG_TOKEN } from '../../models/elements-token';
import { IPageConfig } from '../../models/elements-interfaces';
import { fromEvent, takeUntil } from 'rxjs';
import { ElementsFacede } from '../../facede/elements-facede';
import { DomElementAdpter } from '@portifolio/util/adpters';

@Directive({
  selector: '[moveHandler]',
  standalone: true,
  host: {
    '[style.cursor]': '"grab"',
  },
})
export class MoveHandlerDirective implements OnInit {
  private initialX = 0;
  private initialY = 0;
  private currentX = 0;
  private currentY = 0;
  private dragEnd$ = fromEvent<MouseEvent>(document, 'mouseup');
  private dragStart$ = fromEvent<MouseEvent>(
    this.elementRef.nativeElement,
    'mousedown'
  );
  private drag$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(
    takeUntil(this.dragEnd$)
  );

  constructor(
    private readonly elementRef: ElementRef,
    private readonly elementsFacede: ElementsFacede,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  ngOnInit(): void {
    this.dragStart$.subscribe((event) => this.dragStart(event));
  }

  dragStart(event: MouseEvent) {
    const element = this._config.elementReference.value?.element.nativeElement;
    const draggingBoundaryElement =
      this.elementsFacede.draggingBoundaryElement.nativeElement.parentElement;

    if (!element || !draggingBoundaryElement) return;

    const maxBoundX = draggingBoundaryElement.offsetWidth - element.offsetWidth;
    const maxBoundY =
      draggingBoundaryElement.offsetHeight - element.offsetHeight;
    this.initialX = event.clientX - this.currentX;
    this.initialY = event.clientY - this.currentY;

    this.drag$.subscribe((event) =>
      this.drag(event, element, maxBoundX, maxBoundY)
    );
  }

  drag(
    event: MouseEvent,
    element: HTMLElement,
    maxBoundX: number,
    maxBoundY: number
  ) {
    event.preventDefault();

    const x = event.clientX - this.initialX;
    const y = event.clientY - this.initialY;

    this.currentX = Math.max(0, Math.min(x, maxBoundX));
    this.currentY = Math.max(0, Math.min(y, maxBoundY));

    DomElementAdpter.setTransform(element, this.currentX, this.currentY);
  }
}
