/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PageEventsService } from './page-events.service';

describe('Service: PageEvents', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageEventsService]
    });
  });

  it('should ...', inject([PageEventsService], (service: PageEventsService) => {
    expect(service).toBeTruthy();
  }));
});
