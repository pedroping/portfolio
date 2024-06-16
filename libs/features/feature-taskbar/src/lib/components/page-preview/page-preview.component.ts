import { Component, HostListener, OnInit } from '@angular/core';
import {
  ELEMENT_BASE_ICON,
  ElementsFacede,
} from '@portifolio/features/feature-page-creator';
import { CloseComponent } from '@portifolio/ui/ui-page-actions-buttons';
import { IPreviewPage } from '../../models/preview-models';
import { NgComponentOutlet } from '@angular/common';
import { PagePreviewActionsService } from '../../services/page-preview-actions.service';
import { IPageConfig } from '@portifolio/utils/util-models';

@Component({
  selector: 'page-preview',
  templateUrl: './page-preview.component.html',
  styleUrls: ['./page-preview.component.scss'],
  standalone: true,
  imports: [CloseComponent, NgComponentOutlet],
})
export class PagePreviewComponent implements IPreviewPage, OnInit {
  element?: IPageConfig;
  icon = ELEMENT_BASE_ICON;

  constructor(
    private readonly elementsFacade: ElementsFacede,
    private readonly pagePreviewActionsService: PagePreviewActionsService
  ) {}

  @HostListener('click') onClick() {
    if (this.element?.opened && this.element.element$.value) {
      this.elementsFacade.setNewZIndex(
        this.element.id,
        this.element.element$.value
      );
      this.pagePreviewActionsService.setCloseAll();
      return;
    }

    this.elementsFacade.openElement(this.element?.id ?? -1);
    this.pagePreviewActionsService.setCloseAll();
  }

  ngOnInit(): void {
    this.icon = this.element?.icon ?? ELEMENT_BASE_ICON;
  }

  closeElement() {
    this.elementsFacade.destroyElement(this.element?.id ?? -1);
  }
}
