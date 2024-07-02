import {
  DestroyRef,
  Directive,
  HostListener,
  Inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomElementAdpter } from '@portifolio/utils/util-adpters';
import { CONFIG_TOKEN, IPageConfig } from '@portifolio/utils/util-models';
import { WorkspaceReferenceFacade } from '@portifolio/utils/util-workspace-reference';
import { filter, fromEvent, take } from 'rxjs';
import { ElementsFacade } from '../../facades/elements-facade/elements-facade';
import { ELEMENT_PADDING } from '../../mocks/elements.mocks';
import { OBSERVE_CONFIG } from '../../mocks/observerConfig-mocks';

@Directive({
  selector: '[pageMaximize]',
  standalone: true,
})
export class PageMaximizeDirective implements OnInit {
  lastHeight = 0;
  currentWidth: string | number = 'auto';
  currentHeight: string | number = 'auto';
  lastTranslet3d = DomElementAdpter.getTranslate3d(0, 0);

  constructor(
    private readonly destroyRef: DestroyRef,
    private readonly elementsFacade: ElementsFacade,
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig,
    private readonly workspaceReferenceFacade: WorkspaceReferenceFacade
  ) {}

  @HostListener('click') onclick() {
    const element = this._config.element$.value;

    if (!element) return;

    const isFullScreen = this._config.isFullScreen;

    if (!isFullScreen) this.setSizes();

    if (!element) return;

    this.setFullScreen(!isFullScreen, element);
    this._config.isFullScreen = !this._config.isFullScreen;
  }

  ngOnInit(): void {
    const boundaryElement = this.workspaceReferenceFacade.element;
    if (!boundaryElement) return;
    this.lastHeight = boundaryElement.offsetHeight;

    this._config.element$
      .pipe(take(2), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (!this._config || !this._config.isFullScreen) return;
        const element = this._config.element$.value;

        if (!element) return;

        this.setSizes();
        this.elementsFacade.openElement(this._config.id);
        this.lastTranslet3d = DomElementAdpter.getTranslate3d(
          this._config.customX || 0,
          this._config.customY || 0
        );

        this.setFullScreen(true, element);
      });

    this.createBoundaryObservers();
  }

  createBoundaryObservers() {
    this.workspaceReferenceFacade.element$$
      .pipe(filter(Boolean), takeUntilDestroyed(this.destroyRef))
      .subscribe((boundaryElement) => {
        new MutationObserver(() => {
          if (this.lastHeight === boundaryElement.offsetHeight) return;

          this.lastHeight = boundaryElement.offsetHeight;
          const element = this._config.element$.value;

          if (!element) return;

          if (
            !this._config ||
            !this._config.isFullScreen ||
            !this._config.opened
          )
            return;

          this.setFullScreen(true, element);
        }).observe(boundaryElement, OBSERVE_CONFIG);

        fromEvent(window, 'resize')
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => {
            const element = this._config.element$.value;

            if (!this._config.isFullScreen || !this._config.opened || !element)
              return;

            this.setFullScreen(true, element);
          });
      });
  }

  setFullScreen(hasToSet: boolean, element: HTMLElement) {
    const boundaryElement = this.workspaceReferenceFacade.element;
    if (!boundaryElement) return;

    if (
      this.currentWidth == boundaryElement.offsetWidth + ELEMENT_PADDING * 2 &&
      this.currentHeight ==
        boundaryElement.offsetHeight + ELEMENT_PADDING * 2 &&
      hasToSet
    )
      return this.setBaseScreenSize(element);

    const transform = hasToSet
      ? DomElementAdpter.getTranslate3d(0, 0)
      : this.lastTranslet3d;
    const width = hasToSet
      ? boundaryElement.offsetWidth + ELEMENT_PADDING * 2
      : this.currentWidth;
    const height = hasToSet
      ? boundaryElement.offsetHeight + ELEMENT_PADDING * 2
      : this.currentHeight;

    element.classList[hasToSet ? 'add' : 'remove']('onFullSrcreen');

    this.setPropierties({ element, width, height, transform });
  }

  setBaseScreenSize(element: HTMLElement) {
    const width = this._config.baseSizes.width;
    const height = this._config.baseSizes.height;
    const transform = this.lastTranslet3d;

    this.setPropierties({ element, width, height, transform });
  }

  setPropierties(params: {
    element: HTMLElement;
    width: number | string;
    height: number | string;
    transform: string;
  }) {
    DomElementAdpter.setTransition(params.element);

    params.element.style.width = params.width + 'px';
    params.element.style.height = params.height + 'px';
    params.element.style.transform = params.transform;
    params.element.style.display = 'block';

    DomElementAdpter.afterTransitions(params.element).subscribe(() => {
      DomElementAdpter.removeTransition(params.element);
      this.setMaxPositions();
    });
  }

  setMaxPositions() {
    const boundaryElement = this.workspaceReferenceFacade.element;
    const element = this._config.element$.value;

    if (!boundaryElement || !element || this._config.isFullScreen) return;

    const boundaryHeight = boundaryElement.offsetHeight + ELEMENT_PADDING * 2;
    const boundaryWidth = boundaryElement.offsetWidth + ELEMENT_PADDING * 2;
    const maxBoundX = Math.max(0, boundaryWidth - element.offsetWidth);
    const maxBoundY = Math.max(0, boundaryHeight - element.offsetHeight);

    this._config.lastPosition.x = Math.min(
      Math.max(this._config.lastPosition.x, 0),
      maxBoundX
    );
    this._config.lastPosition.y = Math.min(
      Math.max(this._config.lastPosition.y, 0),
      maxBoundY
    );

    DomElementAdpter.setTransform(
      element,
      this._config.lastPosition.x,
      this._config.lastPosition.y
    );
  }

  setSizes() {
    const element = this._config.element$.value;
    if (!element) return;

    const baseSizes = this._config.baseSizes;
    this.currentWidth =
      element.offsetWidth + ELEMENT_PADDING * 2 || baseSizes.width;
    this.currentHeight =
      element.offsetHeight + ELEMENT_PADDING * 2 || baseSizes.height;
    this.lastTranslet3d = element.style.transform;
  }
}
