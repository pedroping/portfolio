import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  ViewContainerRef,
  input,
  signal,
} from '@angular/core';
import { ElementsFacade } from '@portifolio/features/feature-page-creator';
import { BuildAnimation } from '@portifolio/utils/util-animations';
import { IBasicElement, IInitialConfig } from '@portifolio/utils/util-models';
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
  tap,
  timer,
} from 'rxjs';
import { PagePreviewComponent } from '../../components/page-preview/page-preview.component';
import { TaskbarFacade } from '../../facades/taskbar-facade.service';
import {
  PREVIEW_GAP_LEFT,
  PREVIEW_GAP_TOP,
  PREVIEW_ID,
} from '../../mocks/elements-mocks';

@Directive({
  selector: '[showElementPreview]',
  standalone: true,
  host: {
    '[id]': 'id()',
  },
})
export class ShowElementPreviewDirective implements OnInit {
  previewOpened = false;
  element = input.required<IInitialConfig | IBasicElement>();
  id = signal<string>('');
  elementId?: number;

  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly taskbarFacade: TaskbarFacade,
    private readonly buildAnimation: BuildAnimation,
    private readonly elementsFacade: ElementsFacade,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly lastZIndexService: LastZIndexService,
  ) {}

  @HostListener('touchstart', ['$event']) onTouchStart(event: TouchEvent) {
    if (!this.elementId && this.elementId != 0) return;

    event.stopPropagation();
    event.stopImmediatePropagation();

    let hasCancel = false;

    const touchLeaveEvent$ = merge(
      fromEvent(this.elementRef.nativeElement, 'click'),
      fromEvent(this.elementRef.nativeElement, 'touchend').pipe(take(1)),
      fromEvent(this.elementRef.nativeElement, 'touchleave').pipe(take(1)),
    ).pipe(tap(() => (hasCancel = true)));

    touchLeaveEvent$
      .pipe(
        startWith(undefined),
        debounceTime(500),
        filter(() => !hasCancel),
        take(1),
      )
      .subscribe(() => this.createElement());
  }

  @HostListener('mouseenter')
  openElementOnMouse() {
    if (!this.elementId && this.elementId != 0) return;
    if (this.previewOpened) return;

    let hasCancel = false;

    const mouseLeave$ = merge(
      fromEvent(this.elementRef.nativeElement, 'click'),
      fromEvent(this.elementRef.nativeElement, 'mouseleave'),
    ).pipe(tap(() => (hasCancel = true)));

    mouseLeave$
      .pipe(
        startWith(undefined),
        debounceTime(500),
        filter(() => !hasCancel),
        take(1),
      )
      .subscribe(() => {
        if (hasCancel) return;
        this.createElement();
      });
  }

  ngOnInit(): void {
    const element = this.element();

    if (this.isBasicElement(element)) this.setIds(element.id);
  }

  setIds(id?: number) {
    this.elementId = id;
    this.id.set(id == undefined ? '' : PREVIEW_ID + id);
  }

  createElement() {
    if (!this.elementId && this.elementId != 0) return;

    this.vcr.clear();
    this.taskbarFacade.setCloseOtherMenus(this.id());

    this.previewOpened = true;

    const { location, instance } =
      this.vcr.createComponent(PagePreviewComponent);

    const view = location.nativeElement as HTMLElement;
    const rect = this.elementRef.nativeElement.getBoundingClientRect();

    view.id = this.id();
    view.style.left = rect.left - PREVIEW_GAP_LEFT + 'px';
    view.style.top = rect.top - PREVIEW_GAP_TOP + 'px';
    view.style.zIndex = this.lastZIndexService.createNewZIndex();

    const elementReference = this.elementsFacade.getElement(this.elementId);

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
      this.taskbarFacade.closeAll$$,
      timer(2000, 2000).pipe(filter(() => !this.hasHover())),
      this.taskbarFacade.getHasToClose(this.id()),
    )
      .pipe(takeUntil(close$))
      .subscribe(() => closeElement());
  }

  hasHover() {
    const onHoverElements = document.querySelectorAll(':hover');

    return Array.from(onHoverElements).some(
      (element) => element.id === this.id(),
    );
  }

  isBasicElement(
    element: IBasicElement | IInitialConfig,
  ): element is IBasicElement {
    return (
      !!(element as IBasicElement).id || (element as IBasicElement).id == 0
    );
  }
}
