import { TitleCasePipe } from '@angular/common';
import { Component, HostListener, computed, input } from '@angular/core';
import { ElementsFacede } from '@portifolio/features/feature-page-creator';
import { MenuEventsService } from '@portifolio/utils/util-events';
import { IPageMock } from '@portifolio/utils/util-models';
import { ELEMENT_BASE_ICON } from '../../mocks/program-mocks';
import { IBasicProgram } from '../../models/program-models';
@Component({
  selector: 'program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
  standalone: true,
  imports: [TitleCasePipe],
})
export class ProgramComponent {
  pageConfig = input<IPageMock>();
  basicProgram = input<IBasicProgram>();

  name = computed(
    () => this.pageConfig()?.config.name ?? this.basicProgram()?.name ?? ''
  );
  sub = computed(
    () => this.pageConfig()?.config.sub ?? this.basicProgram()?.sub ?? ''
  );
  imgSrc = computed(
    () =>
      this.pageConfig()?.config.icon ??
      this.basicProgram()?.icon ??
      ELEMENT_BASE_ICON
  );

  constructor(
    private readonly elementsFacede: ElementsFacede,
    private readonly menuEventsService: MenuEventsService
  ) {}

  @HostListener('click') onCLick() {
    const pageConfig = this.pageConfig();

    if (pageConfig) {
      this.elementsFacede.createElement(
        {},
        pageConfig.config,
        pageConfig.domConfig
      );
      this.menuEventsService.setCloseMenu();
      return;
    }

    window.open(this.basicProgram()?.link);
    window.focus();
  }
}
