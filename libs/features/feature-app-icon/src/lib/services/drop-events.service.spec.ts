/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DropEventsService } from './drop-events.service';

describe('Service: DropEvents', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DropEventsService]
    });
  });

  it('should ...', inject([DropEventsService], (service: DropEventsService) => {
    expect(service).toBeTruthy();
  }));
});
