import { Injectable, Injector, Type, ViewRef } from '@angular/core';
import { WorkspaceReferenceDataService } from '../workspace-reference-data/workspace-reference-data.service';
import { IComponent } from '../../models/handle-vcr-models';

@Injectable({ providedIn: 'root' })
export class HandleVcrService<T> {
  constructor(
    private readonly workspaceReferenceDataService: WorkspaceReferenceDataService,
  ) {}

  createComponent(component: Type<T>, injection?: Injector): IComponent<T> {
    const index = this.workspaceReferenceDataService.vcr.length;

    const componentRef =
      this.workspaceReferenceDataService.vcr.createComponent<T>(component, {
        index,
        injector: injection,
      });

    return { componentRef, index };
  }

  clear(hostView?: ViewRef) {
    if (!hostView) return this.workspaceReferenceDataService.vcr.clear();

    const index = this.workspaceReferenceDataService.vcr.indexOf(hostView);
    this.workspaceReferenceDataService.vcr.remove(index);
  }
}
