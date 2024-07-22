/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppEventsHandleFacade } from './app-events-handle-facade.service';

describe('Service: AppEventsHandleFacade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppEventsHandleFacade],
    });
  });

  it('should ...', inject(
    [AppEventsHandleFacade],
    (service: AppEventsHandleFacade) => {
      expect(service).toBeTruthy();
    },
  ));
});
