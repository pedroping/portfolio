import {
  Directive,
  ElementRef,
  HostListener,
  ViewContainerRef,
  computed,
  input,
} from '@angular/core';
import {
  ElementsFacede,
  IBasicElement,
} from '@portifolio/features/feature-page-creator';
import { BuildAnimation } from '@portifolio/utils/util-animations';
import { LastZIndexService } from '@portifolio/utils/util-z-index-handler';
import { Subject, filter, merge, takeUntil, timer } from 'rxjs';
import { PagePreviewComponent } from '../../components/page-preview/page-preview.component';
import {
  PREVIEW_GAP_LEFT,
  PREVIEW_GAP_TOP,
  PREVIEW_ID,
} from '../../mocks/elements-mocks';
import { PagePreviewActionsService } from '../../services/page-preview-actions.service';

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
    private readonly elementsFacade: ElementsFacede,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly lastZIndexService: LastZIndexService,
    private readonly pagePreviewActionsService: PagePreviewActionsService
  ) {}

  @HostListener('mouseenter') onHover() {
    if (this.previewOpened) return;
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
