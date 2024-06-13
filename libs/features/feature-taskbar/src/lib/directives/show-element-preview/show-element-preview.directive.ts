import {
  Directive,
  ElementRef,
  HostListener,
  ViewContainerRef,
  input,
} from '@angular/core';
import {
  ElementsFacede,
  IBasicElement,
} from '@portifolio/features/feature-page-creator';
import { PagePreviewComponent } from '../../components/page-preview/page-preview.component';
import { PREVIEW_GAP } from '../../mocks/elements-mocks';
import { Subject, fromEvent, merge, takeUntil, timer } from 'rxjs';

@Directive({
  selector: '[showElementPreview]',
  standalone: true,
})
export class ShowElementPreviewDirective {
  previewOpened = false;
  element = input.required<IBasicElement>({ alias: 'showElementPreview' });

  constructor(
    private readonly vcr: ViewContainerRef,
    private readonly elementsFaced: ElementsFacede,
    private readonly elementRef: ElementRef<HTMLElement>
  ) {}

  @HostListener('mouseenter') onHover() {
    if (this.previewOpened) return;
    this.vcr.clear();

    this.previewOpened = true;

    const { location } = this.vcr.createComponent(PagePreviewComponent);

    const view = location.nativeElement as HTMLElement;
    const rect = this.elementRef.nativeElement.getBoundingClientRect();

    view.style.top = rect.top - PREVIEW_GAP + 'px';
    view.style.left = rect.left + 'px';

    this.createCloseTimeout(view);
  }

  createCloseTimeout(view: HTMLElement) {
    const close$ = new Subject<void>();

    let hasMouseEnter = false;

    merge(
      fromEvent(view, 'mousemove'),
      fromEvent(view, 'mouseenter'),
      fromEvent(this.elementRef.nativeElement, 'mousemove'),
      fromEvent(this.elementRef.nativeElement, 'mouseenter')
    )
      .pipe(takeUntil(close$))
      .subscribe(() => (hasMouseEnter = true));

    timer(100, 2000)
      .pipe(takeUntil(close$))
      .subscribe(() => {
        if (hasMouseEnter) {
          hasMouseEnter = false;
          return;
        }

        this.previewOpened = false;
        this.vcr.clear();
        close$.next();
      });
  }
}
