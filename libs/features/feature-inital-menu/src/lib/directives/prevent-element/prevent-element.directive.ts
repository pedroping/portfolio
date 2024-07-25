import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { MenuEventsFacade } from '../../facades/menu-events-facade';

@Directive({
  selector: '[preventElement]',
  standalone: true,
})
export class PreventElementDirective implements AfterViewInit {
  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly menuEventsFacade: MenuEventsFacade,
  ) {}

  ngAfterViewInit(): void {
    this.menuEventsFacade.pushElement(this.elementRef.nativeElement);
  }
}
