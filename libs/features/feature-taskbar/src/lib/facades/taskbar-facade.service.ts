import { Injectable } from '@angular/core';
import { PagePreviewActionsService } from '../services/page-preview-actions/page-preview-actions.service';
import { FixedProgramsService } from '../services/fixed-programs/fixed-programs.service';

@Injectable({ providedIn: 'root' })
export class TaskbarFacade {
  constructor(
    private readonly fixedProgramsService: FixedProgramsService,
    private readonly pagePreviewActionsService: PagePreviewActionsService
  ) {}

  setNew(id: number) {
    this.fixedProgramsService.setNew(id);
  }

  removeId(id: number) {
    this.fixedProgramsService.removeId(id);
  }

  get hideFixed() {
    return this.fixedProgramsService.hideFixed;
  }

  get hideFixed$$() {
    return this.fixedProgramsService.hideFixed$$;
  }

  setCloseOtherMenus(id: string) {
    this.pagePreviewActionsService.setCloseOtherMenus(id);
  }

  setCloseAll() {
    this.pagePreviewActionsService.setCloseAll();
  }

  get closeAll$$() {
    return this.pagePreviewActionsService.closeAll$$;
  }

  getHasToClose(id: string) {
    return this.pagePreviewActionsService.getHasToClose(id);
  }
}
