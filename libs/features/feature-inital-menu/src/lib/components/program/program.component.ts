import { TitleCasePipe } from '@angular/common';
import { Component, HostListener, computed, input } from '@angular/core';
import { ElementsFacade } from '@portifolio/features/feature-page-creator';
import { IPageMock } from '@portifolio/utils/util-models';
import { MenuEventsFacade } from '../../facades/menu-events-facade';
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
  pageConfig = input<IPageMock | IBasicProgram>();

  name = computed(() => {
    const config = this.pageConfig();
    if (!config) return '';

    if (this.isBasicProgram(config)) {
      return config.name;
    }

    return config.config.name;
  });

  sub = computed(() => {
    const config = this.pageConfig();
    if (!config) return '';

    if (this.isBasicProgram(config)) {
      return config.sub;
    }

    return config.config.sub;
  });

  imgSrc = computed(() => {
    const config = this.pageConfig();
    if (!config) return ELEMENT_BASE_ICON;

    if (this.isBasicProgram(config)) {
      return config.icon ?? ELEMENT_BASE_ICON;
    }

    return config.config.icon ?? ELEMENT_BASE_ICON;
  });

  constructor(
    private readonly ElementsFacade: ElementsFacade,
    private readonly menuEventsFacade: MenuEventsFacade
  ) {}

  @HostListener('click') onCLick() {
    const config = this.pageConfig();
    if (!config) return;

    if (this.isBasicProgram(config)) {
      window.open(config.link);
      window.focus();
      return;
    }

    this.ElementsFacade.createElement({}, config.config);
    this.menuEventsFacade.setCloseMenu();
  }

  isBasicProgram(config: IPageMock | IBasicProgram): config is IBasicProgram {
    return !!(config as IBasicProgram)?.name;
  }
}
