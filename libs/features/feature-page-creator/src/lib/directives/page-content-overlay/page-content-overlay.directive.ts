import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  Inject,
  contentChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomElementAdpter } from '@portifolio/utils/util-adpters';
import { CONFIG_TOKEN, IPageConfig } from '@portifolio/utils/util-models';
import { map, merge, take } from 'rxjs';
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
    private readonly ElementsFacade: ElementsFacade,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  ngAfterViewInit(): void {
    merge(
      this.eventsFacade.changeZIndex$$,
      this._config.element$.pipe(take(1)),
      this.ElementsFacade.elements$.asObservable()
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.validateOverlay());

    this.ElementsFacade.anyElementEvent$$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(this.handleBoolean);

    this.eventsFacade.createOverlay$$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map(() => true)
      )
      .subscribe(this.handleBoolean);
  }

  validateOverlay() {
    const element = this._config.element$.value;

    if (!element) return;

    const hasNoOtherElement = this.ElementsFacade.isOnlyElementOpened(
      this._config.id
    );

    if (hasNoOtherElement) return this.removeOverlay();

    const isHiggestElement =
      this._config.id == this.ElementsFacade.getHiggestElementId();

    if (isHiggestElement) return this.removeOverlay();

    const isBehindAnotherElement = this.getIsBehindAnotherElement(
      this._config.id,
      element
    );

    if (isBehindAnotherElement) return this.addOverlay();

    this.removeOverlay();
  }

  getIsBehindAnotherElement(id: number, element: HTMLElement) {
    return !!this.ElementsFacade.elements$.value
      .filter((item) => item.id != id)
      .filter((item) => !!item.opened)
      .map(
        (item) =>
          item.element$.value &&
          +item.element$.value.style.zIndex > +element.style.zIndex &&
          !!DomElementAdpter.elementAboveOther(item.element$.value, element)
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
