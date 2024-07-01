/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WorkspaceReferenceFacade } from './workspace-reference-facade.service';

describe('Service: WorkspaceReferenceFacade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkspaceReferenceFacade],
    });
  });

  it('should ...', inject(
    [WorkspaceReferenceFacade],
    (service: WorkspaceReferenceFacade) => {
      expect(service).toBeTruthy();
    }
  ));
});
