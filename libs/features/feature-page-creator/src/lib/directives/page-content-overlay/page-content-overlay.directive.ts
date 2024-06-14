import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  Inject,
  contentChild,
} from '@angular/core';
import { MenuEventsService } from '@portifolio/features/feature-inital-menu';
import { DomElementAdpter } from '@portifolio/utils/util-adpters';
import { fromEvent, merge, take } from 'rxjs';
import { ElementsFacede } from '../../facedes/elements-facades/elements-facede';
import { EventsFacade } from '../../facedes/events-facades/events-facade.service';
import { IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[pageContentOverlay]',
  standalone: true,
})
export class PageContentOverlayDirective implements AfterViewInit {
  overlay = contentChild<ElementRef<HTMLElement>>('overlay');

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly eventsFacade: EventsFacade,
    private readonly elementsFacede: ElementsFacede,
    private readonly menuEventsService: MenuEventsService,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig
  ) {}

  ngAfterViewInit(): void {
    const mouseLeaveEvent$ = fromEvent(document, 'mouseleave');

    merge(
      mouseLeaveEvent$,
      this.eventsFacade.changeZIndex$$,
      this.elementsFacede.elements$.asObservable(),
      this._config.element$.pipe(take(2))
    )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.validateOverlay());

    this.elementsFacede.anyElementEvent$$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(this.handleBoolean);
    this.menuEventsService.menuOpened$$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(this.handleBoolean);
  }

  validateOverlay() {
    const element = this._config.element$.value;

    if (!element) return;

    const hasNoOtherElement = this.elementsFacede.isOnlyElementOpened(
      this._config.id
    );

    if (hasNoOtherElement) return this.removeOverlay();

    const isHiggestElement =
      this._config.id == this.elementsFacede.getHiggestElementId();

    if (isHiggestElement) return this.removeOverlay();

    const isBehindAnotherElement = this.getIsBehindAnotherElement(
      this._config.id,
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
