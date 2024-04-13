import { Directive, ElementRef, Inject, OnInit } from '@angular/core';
import { DomElementAdpter } from '@portifolio/util/adpters';
import { fromEvent, takeUntil } from 'rxjs';
import { ElementsFacede } from '../../facede/elements-facede';
import { IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';
import { PreventHandlerElements } from '../../services/prevent-handler-elements/prevent-handler-elements.service';

@Directive({
  selector: '[moveHandler]',
  standalone: true,
  host: {
    '[style.cursor]': '"grab"',
  },
})
export class MoveHandlerDirective implements OnInit {
  initialX = 0;
  initialY = 0;
  currentX = 0;
  currentY = 0;
  dragEnd$ = fromEvent<MouseEvent>(document, 'mouseup');
  dragStart$ = fromEvent<MouseEvent>(
    this.elementRef.nativeElement,
    'mousedown'
  );
  drag$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(
    takeUntil(this.dragEnd$)
  );

  constructor(
    private readonly elementRef: ElementRef,
    private readonly elementsFacede: ElementsFacede,
    private readonly preventHandlerElements: PreventHandlerElements,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  ngOnInit(): void {
    this.dragStart$.subscribe((event) => this.dragStart(event));
  }

  dragStart(event: MouseEvent) {
    if (this.hasPrevent(event.target as HTMLElement)) return;

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

  hasPrevent(element: HTMLElement) {
    return this.preventHandlerElements.hasElement(element);
  }
}
