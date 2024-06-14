import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ElementsFacede } from '@portifolio/features/feature-page-creator';
import { ShowElementPreviewDirective } from '../../directives/show-element-preview/show-element-preview.directive';
import { PagePreviewActionsService } from '../../services/page-preview-actions.service';
@Component({
  selector: 'pages-list',
  templateUrl: './pages-list.component.html',
  styleUrls: ['./pages-list.component.scss'],
  standalone: true,
  imports: [AsyncPipe, ShowElementPreviewDirective],
})
export class PagesListComponent {
  basicElements$ = this.elementsFacede.basicElements$;

  constructor(
    private readonly elementsFacede: ElementsFacede,
    private readonly pagePreviewActionsService: PagePreviewActionsService
  ) {}

  handelElementClick(id: number) {
    this.elementsFacede.openElement(id);
    this.pagePreviewActionsService.setCloseAll();
  }
}
