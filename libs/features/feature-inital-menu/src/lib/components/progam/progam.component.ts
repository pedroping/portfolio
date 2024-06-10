import { Component, computed, input } from '@angular/core';
import {
  IInitialConfig,
  IPageMock,
} from '@portifolio/features/feature-page-creator';
import { ELEMENT_BASE_ICON } from '../../mocks/program-mocks';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'progam',
  templateUrl: './progam.component.html',
  styleUrls: ['./progam.component.scss'],
  standalone: true,
  imports: [TitleCasePipe],
})
export class ProgamComponent {
  pageConfig = input.required<IPageMock>();
  program = computed(() => this.pageConfig().config);
  defaultIcon = ELEMENT_BASE_ICON;
}
