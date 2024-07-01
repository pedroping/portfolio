import { Injectable, Injector, Type } from '@angular/core';
import { WorkspaceReferenceDataService } from '../workspace-reference-data/workspace-reference-data.service';
import { IComponent } from '../../models/handle-vcr-models';

@Injectable({ providedIn: 'root' })
export class HandleVcrService<T> {
  actualId = 0;

  constructor(
    private readonly workspaceReferenceDataService: WorkspaceReferenceDataService
  ) {}

  createComponent(component: Type<T>, injection?: Injector): IComponent<T> {
    const index = this.newIndex;

    const componentRef =
      this.workspaceReferenceDataService.vcr.createComponent<T>(component, {
        index,
        injector: injection,
      });

    return { componentRef, index };
  }

  private get newIndex() {
    return this.actualId++;
  }

  clear(id?: number) {
    if (!id && id != 0) return this.workspaceReferenceDataService.vcr.clear();
    this.actualId = Math.max(0, this.actualId - 1);
    this.workspaceReferenceDataService.vcr.remove(id);
  }
}
