import { Component } from '@angular/core';
import {
  ElementsFacede,
  IPageConfig,
} from '@portifolio/features/feature-page-creator';
import { CloseComponent } from '@portifolio/ui/ui-page-actions-buttons';
import { IPreviewPage } from '../../models/preview-models';

@Component({
  selector: 'page-preview',
  templateUrl: './page-preview.component.html',
  styleUrls: ['./page-preview.component.scss'],
  standalone: true,
  imports: [CloseComponent],
})
export class PagePreviewComponent implements IPreviewPage {
  element?: IPageConfig;

  constructor(private readonly elementsFacade: ElementsFacede) {}

  closeElement() {
    this.elementsFacade.destroyElement(this.element?.id ?? -1);
  }
}
