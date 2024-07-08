import { Injectable } from '@angular/core';
import { TAvalilableOptions } from '@portifolio/utils/util-models';
import { ContextMenuStateService } from '../services/context-menu-state/context-menu-state.service';
import { OptionSelectedService } from '../services/option-selected/option-selected.service';

@Injectable({ providedIn: 'root' })
export class ContextMenuFacade<T> {
  constructor(
    private readonly optionSelectedService: OptionSelectedService<T>,
    private readonly contextMenuStateService: ContextMenuStateService
  ) {}

  setCleatAll() {
    this.contextMenuStateService.setCleatAll();
  }

  setClearDefault() {
    this.contextMenuStateService.setClearDefault();
  }

  setOptionSelected(
    option: TAvalilableOptions,
    parentId: string | number,
    data?: T
  ) {
    this.optionSelectedService.setOptionSelected(option, parentId, data);
  }

  getEventByOption(option: TAvalilableOptions, parentId?: string | number) {
    return this.optionSelectedService.getEventByOption(option, parentId);
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
