import {
  ComponentRef,
  Injectable,
  Injector,
  Type,
  ViewRef,
} from '@angular/core';
import { WorkspaceReferenceDataService } from '../workspace-reference-data/workspace-reference-data.service';

@Injectable({ providedIn: 'root' })
export class HandleVcrService<T> {
  constructor(
    private readonly workspaceReferenceDataService: WorkspaceReferenceDataService,
  ) {}

  createComponent(component: Type<T>, injection?: Injector): ComponentRef<T> {
    const componentRef =
      this.workspaceReferenceDataService.vcr.createComponent<T>(component, {
        injector: injection,
      });

    return componentRef;
  }

  clear(hostView?: ViewRef) {
    if (!hostView) return this.workspaceReferenceDataService.vcr.clear();

    const index = this.workspaceReferenceDataService.vcr.indexOf(hostView);
    this.workspaceReferenceDataService.vcr.remove(index);
  }
}
