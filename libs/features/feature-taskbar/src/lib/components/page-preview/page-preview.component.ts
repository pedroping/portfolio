import { Component } from '@angular/core';
import { IPreviewPage } from '../../models/preview-models';
import { IElementReference } from '@portifolio/features/feature-page-creator';

@Component({
  selector: 'page-preview',
  templateUrl: './page-preview.component.html',
  styleUrls: ['./page-preview.component.scss'],
  standalone: true,
})
export class PagePreviewComponent implements IPreviewPage {
  element?: IElementReference;
}
