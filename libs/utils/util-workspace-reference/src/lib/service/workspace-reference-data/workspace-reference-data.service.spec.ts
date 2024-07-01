/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WorkspaceReferenceDataService } from './workspace-reference-data.service';

describe('Service: WorkspaceReferenceData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkspaceReferenceDataService]
    });
  });

  it('should ...', inject([WorkspaceReferenceDataService], (service: WorkspaceReferenceDataService) => {
    expect(service).toBeTruthy();
  }));
});
