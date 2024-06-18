import {
  Directive,
  ElementRef,
  HostListener,
  ViewContainerRef,
  computed,
  input,
} from '@angular/core';
import { BuildAnimation } from '@portifolio/utils/util-animations';
import { LastZIndexService } from '@portifolio/utils/util-z-index-handler';
import {
  Subject,
  debounceTime,
  filter,
  fromEvent,
  merge,
  startWith,
  take,
  takeUntil,
  timer,
} from 'rxjs';
import { PagePreviewComponent } from '../../components/page-preview/page-preview.component';
import {
  PREVIEW_GAP_LEFT,
  PREVIEW_GAP_TOP,
  PREVIEW_ID,
} from '../../mocks/elements-mocks';
import { PagePreviewActionsService } from '../../services/page-preview-actions.service';
import { IBasicElement } from '@portifolio/utils/util-models';
import { ElementsFacade } from '@portifolio/utils/util-facades';

@Directive({
  selector: '[showElementPreview]',
  standalone: true,
  host: {
    '[id]': 'id()',
  },
})
export class ShowElementPreviewDirective {
  previewOpened = false;
  element = input.required<IBasicElement>({ alias: 'showElementPreview' });
  id = computed(() => PREVIEW_ID + this.element().id);

  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly buildAnimation: BuildAnimation,
    private readonly elementsFacade: ElementsFacade,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly lastZIndexService: LastZIndexService,
    private readonly pagePreviewActionsService: PagePreviewActionsService
  ) {}

  @HostListener('touchstart', ['$event']) onTouchStart(event: TouchEvent) {
    event.stopPropagation();
    event.stopImmediatePropagation();

    let hasCancel = false;

    const touchLeaveEvent$ = merge(
      fromEvent(this.elementRef.nativeElement, 'click'),
      fromEvent(this.elementRef.nativeElement, 'touchend').pipe(take(1)),
      fromEvent(this.elementRef.nativeElement, 'touchleave').pipe(take(1))
    );

    touchLeaveEvent$.subscribe(() => {
      hasCancel = true;
    });

    touchLeaveEvent$
      .pipe(startWith(undefined), debounceTime(500), take(1))
      .subscribe(() => {
        if (hasCancel) return;
        this.createElement();
      });
  }

  @HostListener('mouseenter')
  openElementOnMouse() {
    if (this.previewOpened) return;

    let hasCancel = false;

    const mouseLeave$ = merge(
      fromEvent(this.elementRef.nativeElement, 'click'),
      fromEvent(this.elementRef.nativeElement, 'mouseleave')
    );

    mouseLeave$.subscribe(() => {
      hasCancel = true;
    });

    mouseLeave$
      .pipe(startWith(undefined), debounceTime(500), take(1))
      .subscribe(() => {
        if (hasCancel) return;
        this.createElement();
      });
  }

  createElement() {
    this.vcr.clear();
    this.pagePreviewActionsService.setCloseOtherMenus(this.id());

    this.previewOpened = true;

    const { location, instance } =
      this.vcr.createComponent(PagePreviewComponent);

    const view = location.nativeElement as HTMLElement;
    const rect = this.elementRef.nativeElement.getBoundingClientRect();

    view.id = this.id();
    view.style.left = rect.left - PREVIEW_GAP_LEFT + 'px';
    view.style.top = rect.top - PREVIEW_GAP_TOP + 'px';
    view.style.zIndex = this.lastZIndexService.createNewZIndex();

    const elementReference = this.elementsFacade.getElement(this.element().id);
    instance.element = elementReference;

    this.buildAnimation.animate('enterAnimationY', view);
    this.createCloseTimeout(view);
  }

  createCloseTimeout(view: HTMLElement) {
    const close$ = new Subject<void>();

    const closeElement = () => {
      this.previewOpened = false;
      this.buildAnimation.animate('leaveAnimationY', view).subscribe(() => {
        this.vcr.clear();
        close$.next();
      });
    };

    merge(
      this.pagePreviewActionsService.closeAll$$,
      timer(2000, 2000).pipe(filter(() => !this.hasHover())),
      this.pagePreviewActionsService.getHasToClose(this.id())
    )
      .pipe(takeUntil(close$))
      .subscribe(() => closeElement());
  }

  hasHover() {
    const onHoverElements = document.querySelectorAll(':hover');

    return Array.from(onHoverElements).some(
      (element) => element.id === this.id()
    );
  }
}
