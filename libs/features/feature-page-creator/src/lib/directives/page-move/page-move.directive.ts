import { Directive, ElementRef, Inject, OnInit } from '@angular/core';
import { DomElementAdpter } from '@portifolio/util/adpters';
import { fromEvent, takeUntil } from 'rxjs';
import { ElementsFacede } from '../../facede/elements-facede';
import { IElement, IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';

@Directive({
  selector: '[pageMove]',
  standalone: true,
  host: {
    '[style.cursor]': '"grab"',
  },
})
export class PageMoveDirective implements OnInit {
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
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  ngOnInit(): void {
    this.currentX = this._config.customX || 0;
    this.currentY = this._config.customY || 0;
    this.dragStart$.subscribe((event) => this.dragStart(event));
  }

  dragStart(event: MouseEvent) {
    if (this.hasPrevent(event.target as HTMLElement)) return;

    const elementReference = this._config.elementReference$.value;
    if (!elementReference) return;

    const element = elementReference.element.nativeElement;
    const draggingBoundaryElement = this.elementsFacede.draggingBoundaryElement;

    if (!draggingBoundaryElement) return;

    const maxBoundX = draggingBoundaryElement.offsetWidth - element.offsetWidth;
    const maxBoundY =
      draggingBoundaryElement.offsetHeight - element.offsetHeight;

    this.initialX = event.clientX - elementReference.lastPosition.x || 0;
    this.initialY = event.clientY - elementReference.lastPosition.y || 0;

    this.drag$.subscribe((event) =>
      this.drag(event, element, maxBoundX, maxBoundY, elementReference)
    );
  }

  drag(
    event: MouseEvent,
    element: HTMLElement,
    maxBoundX: number,
    maxBoundY: number,
    elementReference: IElement
  ) {
    event.preventDefault();

    const x = event.clientX - this.initialX;
    const y = event.clientY - this.initialY;

    const maxPositionX = Math.min(x, maxBoundX);
    const maxPositionY = Math.min(y, maxBoundY);

    this.currentX = Math.max(0, maxPositionX);
    this.currentY = Math.max(0, maxPositionY);
    elementReference.lastPosition = { x: this.currentX, y: this.currentY };

    DomElementAdpter.setTransform(element, this.currentX, this.currentY);
  }

  hasPrevent(element: HTMLElement) {
    return this.elementsFacede.hasPreventElement(element);
  }
}
