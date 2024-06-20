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
import {
  ElementsFacade,
  EventsFacade,
  MenuEventsFacade,
} from '@portifolio/utils/util-facades';
import { IPageConfig } from '@portifolio/utils/util-models';
import { filter, fromEvent, merge, take } from 'rxjs';
import { CONFIG_TOKEN } from '../../models/elements-token';

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
    private readonly menuEventsFacade: MenuEventsFacade,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  ngAfterViewInit(): void {
    const mouseLeaveEvent$ = fromEvent(document, 'mouseleave');

    merge(
      this.eventsFacade.changeZIndex$$,
      this._config.element$.pipe(take(1)),
      this.ElementsFacade.elements$.asObservable(),
      mouseLeaveEvent$.pipe(filter(() => !this.menuEventsFacade.menuOpened))
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.validateOverlay());

    this.ElementsFacade.anyElementEvent$$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(this.handleBoolean);

    this.menuEventsFacade.menuOpened$$
      .pipe(takeUntilDestroyed(this.destroyRef), filter(Boolean))
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
