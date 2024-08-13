import { Directive, HostListener, input } from '@angular/core';
import { ElementsFacade } from '@portifolio/features/feature-page-creator';
import { IPageMock } from '@portifolio/utils/util-models';
import { MenuEventsFacade } from '../../facades/menu-events-facade';
import { IBasicProgram } from '../../models/program-models';

@Directive({
  selector: '[handlePageOpen]',
  standalone: true,
})
export class HandlePageOpenDirective {
  pageConfig = input<IPageMock | IBasicProgram>();

  constructor(
    private readonly elementsFacade: ElementsFacade,
    private readonly menuEventsFacade: MenuEventsFacade,
  ) {}

  @HostListener('click') onCLick() {
    const config = this.pageConfig();
    if (!config) return;

    if (this.isBasicProgram(config)) {
      window.open(config.link);
      window.focus();
      return;
    }

    this.elementsFacade.createElement(config.data, config.config);
    this.menuEventsFacade.setCloseMenu();
  }

  isBasicProgram(config: IPageMock | IBasicProgram): config is IBasicProgram {
    return !!(config as IBasicProgram)?.name;
  }
}
