import { Directive, OnInit, ViewContainerRef } from '@angular/core';
import { ElementsFacede } from '../../facede/elements-facede';

@Directive({
  selector: '[pageParent]',
  standalone: true,
})
export class PageParentDirective implements OnInit {
  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly elementsFacede: ElementsFacede
  ) {}

  ngOnInit() {
    this.elementsFacede.startCreator(this.vcr);
  }
}
