import { Directive, ElementRef, OnInit } from '@angular/core';
import { ElementsFacade } from '../../facades/elements-facade/elements-facade';

@Directive({
  selector: '[preventHandler]',
  standalone: true,
})
export class PreventHandlerDirective implements OnInit {
  constructor(
    private readonly ElementsFacade: ElementsFacade,
    private readonly elementRef: ElementRef<HTMLElement>
  ) {}

  ngOnInit(): void {
    this.ElementsFacade.pushPreventHandlerElement(
      this.elementRef.nativeElement
    );
  }
}
