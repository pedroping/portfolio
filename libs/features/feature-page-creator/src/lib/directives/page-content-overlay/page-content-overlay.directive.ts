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
import { SetZIndexService } from '../../services/set-z-index/set-z-index.service';

@Directive({
  selector: '[pageContentOverlay]',
  standalone: true,
})
export class PageContentOverlayDirective implements AfterViewInit {
  overlay = contentChild<ElementRef<HTMLElement>>('overlay');

  constructor(
    private readonly eventsFacade: EventsFacade,
    private readonly elementsFacede: ElementsFacede,
    private readonly setZIndexService: SetZIndexService,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  ngAfterViewInit(): void {
    merge(
      this.eventsFacade.changeZIndex$$,
      this.elementsFacede.elements$.asObservable(),
      this._config.elementReference$.pipe(take(2))
    ).subscribe(() => this.validateOverlay());

    this._config.elementReference$
      .pipe(
        skip(1),
        switchMap((elementReference) =>
          elementReference!.pageResizing$.asObservable()
        )
      )
      .subscribe((val) => {
        val ? this.addOverlay() : this.removeOverlay();
      });
  }

  validateOverlay() {
    const elementReference = this._config.elementReference$.value;
    if (!elementReference) return;
    const element = elementReference.element;

    const hasNoOtherElement = this.elementsFacede.isOnlyElementOpened(
      elementReference.id
    );

    if (hasNoOtherElement) return this.removeOverlay();

    const isHiggestElement =
      elementReference.id == this.setZIndexService.getHiggestElementId();

    if (isHiggestElement) return this.removeOverlay();

    const isBehindAnotherElement = !!this.elementsFacede.elements$.value
      .filter((item) => item.id != elementReference.id)
      .filter((item) => !!item.opened)
      .map(
        (item) => !!DomElementAdpter.elementAboveOther(item.element, element)
      )
      .find((result) => !!result);

    if (isBehindAnotherElement) return this.addOverlay();

    this.removeOverlay();
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
