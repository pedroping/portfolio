import { Directive, ElementRef, OnInit, ViewContainerRef } from '@angular/core';
import { ElementsFacade } from '@portifolio/utils/util-facades';

@Directive({
  selector: 'pageParent',
  standalone: true,
})
export class PageParentDirective implements OnInit {
  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly elementRef: ElementRef,
    private readonly ElementsFacade: ElementsFacade
  ) {}

  ngOnInit() {
    this.ElementsFacade.startCreator(this.vcr);
    this.ElementsFacade.setDraggingBoundaryElement(
      this.elementRef.nativeElement
    );
  }
}
