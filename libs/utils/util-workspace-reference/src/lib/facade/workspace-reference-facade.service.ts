import {
  Injectable,
  Injector,
  Type,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import { IComponent } from '../models/handle-vcr-models';
import { HandleVcrService } from '../service/handle-vcr/handle-vcr.service';
import { WorkspaceReferenceDataService } from '../service/workspace-reference-data/workspace-reference-data.service';

@Injectable({ providedIn: 'root' })
export class WorkspaceReferenceFacade<T = unknown> {
  constructor(
    private readonly handleVcrService: HandleVcrService<T>,
    private readonly workspaceReferenceDataService: WorkspaceReferenceDataService,
  ) {}

  createComponent(component: Type<T>, injection?: Injector): IComponent<T> {
    return this.handleVcrService.createComponent(component, injection);
  }

  clear(hostView?: ViewRef) {
    this.handleVcrService.clear(hostView);
  }

  setElement(element: HTMLElement) {
    this.workspaceReferenceDataService.setElement(element);
  }

  setVcr(vcr: ViewContainerRef) {
    this.workspaceReferenceDataService.setVcr(vcr);
  }

  get vcr() {
    return this.workspaceReferenceDataService.vcr;
  }

  get element() {
    return this.workspaceReferenceDataService.element;
  }

  get vcr$$() {
    return this.workspaceReferenceDataService.vcr$$;
  }

  get element$$() {
    return this.workspaceReferenceDataService.element$$;
  }
}
