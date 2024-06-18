import { TitleCasePipe } from '@angular/common';
import { Component, HostListener, computed, input } from '@angular/core';
import {
  ElementsFacade,
  MenuEventsFacede,
} from '@portifolio/utils/util-facades';
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
    private readonly ElementsFacade: ElementsFacade,
    private readonly menuEventsFacede: MenuEventsFacede
  ) {}

  @HostListener('click') onCLick() {
    const pageConfig = this.pageConfig();

    if (pageConfig) {
      this.ElementsFacade.createElement(
        {},
        pageConfig.config,
        pageConfig.domConfig
      );
      this.menuEventsFacede.setCloseMenu();
      return;
    }

    window.open(this.basicProgram()?.link);
    window.focus();
  }
}
