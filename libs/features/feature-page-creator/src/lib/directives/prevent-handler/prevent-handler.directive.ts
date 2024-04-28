import { Directive, ElementRef, OnInit } from '@angular/core';
import { ElementsFacede } from '../../facede/elements-facede';

@Directive({
  selector: '[preventHandler]',
  standalone: true,
})
export class PreventHandlerDirective implements OnInit {
  constructor(
    private readonly elementsFacede: ElementsFacede,
    private readonly elementRef: ElementRef<HTMLElement>
  ) {}

  ngOnInit(): void {
    this.elementsFacede.pushPreventHandlerElement(
      this.elementRef.nativeElement
    );
  }
}
