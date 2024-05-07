import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  contentChild,
} from '@angular/core';
import { DomElementAdpter } from '@portifolio/util/util-adpters';
import { merge, skip, switchMap, take } from 'rxjs';
import { ElementsFacede } from '../../facedes/elements-facades/elements-facede';
import { EventsFacade } from '../../facedes/events-facades/events-facade.service';
import { IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';

@Directive({
  selector: '[pageContentOverlay]',
  standalone: true,
})
export class PageContentOverlayDirective implements AfterViewInit {
  overlay = contentChild<ElementRef<HTMLElement>>('overlay');

  constructor(
    private readonly eventsFacade: EventsFacade,
    private readonly elementsFacede: ElementsFacede,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  ngAfterViewInit(): void {
    merge(
      this.eventsFacade.changeZIndex$$,
      this.elementsFacede.elements$.asObservable(),
      this._config.elementReference.element$.pipe(take(2))
    ).subscribe(() => this.validateOverlay());

    this._config.elementReference.element$
      .pipe(
        skip(1),
        switchMap(() =>
          merge(
            this._config.elementReference.pageResizing$.asObservable(),
            this._config.elementReference.pageMoving$.asObservable()
          )
        )
      )
      .subscribe((val) => {
        val ? this.addOverlay() : this.removeOverlay();
      });
  }

  validateOverlay() {
    const elementReference = this._config.elementReference;
    const element = elementReference.element$.value;

    if (!element) return;

    const hasNoOtherElement = this.elementsFacede.isOnlyElementOpened(
      elementReference.id
    );

    if (hasNoOtherElement) return this.removeOverlay();

    const isHiggestElement =
      elementReference.id == this.elementsFacede.getHiggestElementId();

    if (isHiggestElement) return this.removeOverlay();

    const isBehindAnotherElement = this.getIsBehindAnotherElement(
      elementReference.id,
      element
    );

    if (isBehindAnotherElement) return this.addOverlay();

    this.removeOverlay();
  }

  getIsBehindAnotherElement(id: number, element: HTMLElement) {
    return !!this.elementsFacede.elements$.value
      .filter((item) => item.id != id)
      .filter((item) => !!item.opened)
      .map(
        (item) =>
          item.element$.value &&
          !!DomElementAdpter.elementAboveOther(item.element$.value, element)
      )
      .find((result) => !!result);
  }

  addOverlay() {
    const overlay = this.overlay()?.nativeElement;
    if (!overlay) return;
    overlay.style.display = 'block';
  }

  removeOverlay() {
    const overlay = this.overlay()?.nativeElement;
    if (!overlay) return;
    overlay.style.display = 'none';
  }
}
