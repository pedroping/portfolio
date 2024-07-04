import { Injectable } from '@angular/core';
import { TAvalilableOptions } from '@portifolio/utils/util-models';
import { ContextMenuStateService } from '../services/context-menu-state/context-menu-state.service';
import { OptionSelectedService } from '../services/option-selected/option-selected.service';

@Injectable({ providedIn: 'root' })
export class ContextMenuFacade {
  constructor(
    private readonly optionSelectedService: OptionSelectedService,
    private readonly contextMenuStateService: ContextMenuStateService
  ) {}

  setCleatAll() {
    this.contextMenuStateService.setCleatAll();
  }

  setClearDefault() {
    this.contextMenuStateService.setClearDefault();
  }

  setOptionSelected(option: TAvalilableOptions) {
    this.optionSelectedService.setOptionSelected(option);
  }

  get clearDefault$$() {
    return this.contextMenuStateService.clearDefault$$;
  }

  get clearAll$$() {
    return this.contextMenuStateService.clearAll$$;
  }

  get optionSelected$$() {
    return this.optionSelectedService.optionSelected$$;
  }
}
