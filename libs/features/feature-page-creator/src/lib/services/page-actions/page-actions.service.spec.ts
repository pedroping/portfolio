/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PageActionsService } from './page-actions.service';

describe('Service: PageActions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageActionsService]
    });
  });

  it('should ...', inject([PageActionsService], (service: PageActionsService) => {
    expect(service).toBeTruthy();
  }));
});
