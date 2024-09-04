import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  Inject,
  contentChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CONFIG_TOKEN, IPageConfig } from '@portifolio/utils/util-models';
import { fromEvent, map, merge, take } from 'rxjs';
import { DomElementAdpter } from '../../adapters/dom-element-adpter';
import { ElementsFacade } from '../../facades/elements-facade/elements-facade';
import { EventsFacade } from '../../facades/events-facade/events-facade.service';
@Directive({
  selector: '[pageContentOverlay]',
  standalone: true,
})
export class PageContentOverlayDirective implements AfterViewInit {
  overlay = contentChild<ElementRef<HTMLElement>>('overlay');

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly eventsFacade: EventsFacade,
    private readonly elementsFacade: ElementsFacade,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig,
  ) {}

  ngAfterViewInit(): void {
    merge(
      this.eventsFacade.changeZIndex$$,
      this._config.element$.pipe(take(1)),
      this.elementsFacade.elements$.asObservable(),
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.validateOverlay());

    merge(
      this.elementsFacade.anyElementEvent$$,
      this.eventsFacade.createOverlay$$.pipe(map(() => true)),
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(this.handleBoolean);

    this.validateOverlay();

    const overlay = this.overlay()?.nativeElement;

    if (!overlay) return;

    fromEvent(overlay, 'dragover')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const element = this._config.element$.value;

        if (!element) return;

        this.elementsFacade.setNewZIndex(this._config.id, element);
      });
  }

  validateOverlay() {
    const element = this._config.element$.value;

    if (!element) return;

    const hasNoOtherElement = this.elementsFacade.isOnlyElementOpened(
      this._config.id,
    );

    if (hasNoOtherElement) return this.removeOverlay();

    const isHiggestElement =
      this._config.id == this.elementsFacade.getHiggestElementId();

    if (isHiggestElement) return this.removeOverlay();

    const isBehindAnotherElement = this.getIsBehindAnotherElement(
      this._config.id,
      element,
    );

    if (!isBehindAnotherElement) return this.removeOverlay();

    this.addOverlay();
  }

  getIsBehindAnotherElement(id: number, element: HTMLElement) {
    return !!this.elementsFacade.elements$.value
      .filter((item) => item.id != id)
      .filter((item) => !!item.opened)
      .map(
        (item) =>
          item.element$.value &&
          +item.element$.value.style.zIndex > +element.style.zIndex &&
          !!DomElementAdpter.elementAboveOther(item.element$.value, element),
      )
      .find((result) => !!result);
  }

  handleBoolean = (val: boolean) => {
    return val ? this.addOverlay() : this.removeOverlay();
  };

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
