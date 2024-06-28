import { Injectable } from '@angular/core';
import {
  ContextMenuStateService,
  OptionSelectedService,
} from '@portifolio/features/feature-context-menus';
import { TAvalilableOptions } from '@portifolio/utils/util-models';

@Injectable({ providedIn: 'root' })
export class ContextMenuFacade {
  constructor(
    private readonly optionSelectedService: OptionSelectedService,
    private readonly contextMenuStateService: ContextMenuStateService
  ) {}

  setCleatAll() {
    this.contextMenuStateService.setCleatAll();
  }

  get clearAll$$() {
    return this.contextMenuStateService.clearAll$$;
  }

  setOptionSelected(option: TAvalilableOptions) {
    this.optionSelectedService.setOptionSelected(option);
  }

  get optionSelected$$() {
    return this.optionSelectedService.optionSelected$$;
  }
}
