import { NgComponentOutlet } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import {
  ELEMENT_BASE_ICON,
  ElementsFacade,
} from '@portifolio/features/feature-page-creator';
import { CloseComponent } from '@portifolio/ui/ui-page-actions-buttons';
import { IPageConfig } from '@portifolio/utils/util-models';
import { TaskbarFacade } from '../../facades/taskbar-facade.service';
import { IPreviewPage } from '../../models/preview-models';

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
    private readonly taskbarFacade: TaskbarFacade,
    private readonly elementsFacade: ElementsFacade
  ) {}

  @HostListener('click') onClick() {
    if (this.element?.opened && this.element.element$.value) {
      this.elementsFacade.setNewZIndex(
        this.element.id,
        this.element.element$.value
      );
      this.taskbarFacade.setCloseAll();
      return;
    }

    this.elementsFacade.validateElementOpened(this.element?.id ?? -1);
    this.taskbarFacade.setCloseAll();
  }

  ngOnInit(): void {
    this.icon = this.element?.icon ?? ELEMENT_BASE_ICON;
  }

  closeElement() {
    this.elementsFacade.destroyElement(this.element?.id ?? -1);
    this.taskbarFacade.setCloseAll();
  }
}
