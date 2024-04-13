import { Directive, Inject, OnInit } from '@angular/core';
import { IPageConfig } from '../../models/elements-interfaces';
import { CONFIG_TOKEN } from '../../models/elements-token';
import { take } from 'rxjs';
import { ElementsData } from '../../services/elements-data/elements-data.service';

@Directive({
  selector: '[pageResize]',
  standalone: true,
})
export class PageResizeDirective implements OnInit {
  lastHeight: number | string = '';
  lastWidth: number | string = '';

  constructor(
    @Inject(CONFIG_TOKEN) private readonly _config: IPageConfig,
    private readonly elementsData: ElementsData
  ) {}

  ngOnInit(): void {
    this._config.elementReference$
      .pipe(take(2))
      .subscribe((elementReference) => {
        const element = elementReference?.element.nativeElement;
        if (!element) return;

        this.lastWidth = element.offsetWidth;
        this.lastHeight = element.offsetHeight;

        const observeConfig = {
          attributes: true,
          childList: true,
          subtree: true,
        };
        new MutationObserver(() => {
          const width = element.offsetWidth;
          const height = element.offsetHeight;

          const boundaryElement =
            this.elementsData.draggingBoundaryElement
              .parentElement;

          if (
            width == boundaryElement?.offsetWidth &&
            height == boundaryElement.offsetHeight
          )
            return;

          if (width != this.lastWidth || height != this.lastHeight)
            elementReference.isFullScreen = false;
        }).observe(element, observeConfig);
      });
  }
}
