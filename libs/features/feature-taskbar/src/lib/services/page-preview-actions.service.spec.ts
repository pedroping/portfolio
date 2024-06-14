/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PagePreviewActionsService } from './page-preview-actions.service';

describe('Service: PagePreviewActions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PagePreviewActionsService]
    });
  });

  it('should ...', inject([PagePreviewActionsService], (service: PagePreviewActionsService) => {
    expect(service).toBeTruthy();
  }));
});
