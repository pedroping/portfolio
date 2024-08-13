import { TitleCasePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { IPageMock } from '@portifolio/utils/util-models';
import { PreventElementDirective } from '../../directives/prevent-element/prevent-element.directive';
import { ELEMENT_BASE_ICON } from '../../mocks/program-mocks';
import { IBasicProgram } from '../../models/program-models';
import { HandlePageOpenDirective } from '../../directives/handle-page-open/handle-page-open.directive';
@Component({
  selector: 'program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
  standalone: true,
  imports: [TitleCasePipe],
  hostDirectives: [
    PreventElementDirective,
    { directive: HandlePageOpenDirective, inputs: ['pageConfig'] },
  ],
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

  isBasicProgram(config: IPageMock | IBasicProgram): config is IBasicProgram {
    return !!(config as IBasicProgram)?.name;
  }
}
