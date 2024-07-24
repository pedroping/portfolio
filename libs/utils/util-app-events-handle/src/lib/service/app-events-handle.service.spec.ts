/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppEventsHandleService } from './app-events-handle.service';

describe('Service: AppEventsHandle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppEventsHandleService]
    });
  });

  it('should ...', inject([AppEventsHandleService], (service: AppEventsHandleService) => {
    expect(service).toBeTruthy();
  }));
});
