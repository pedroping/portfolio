import { Directive, ElementRef, OnInit } from '@angular/core';
import { PreventHandlerElements } from '../../services/prevent-handler-elements/prevent-handler-elements.service';

@Directive({
  selector: '[preventHandler]',
  standalone: true,
})
export class PreventHandlerDirective implements OnInit {
  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly preventHandlerElements: PreventHandlerElements
  ) {}

  ngOnInit(): void {
    this.preventHandlerElements.pushElement(this.elementRef.nativeElement);
  }
}
