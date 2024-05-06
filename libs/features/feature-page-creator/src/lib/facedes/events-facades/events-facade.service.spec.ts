/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventsFacade } from './events-facade.service';

describe('Service: EventsFacades', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsFacade],
    });
  });

  it('should ...', inject([EventsFacade], (service: EventsFacade) => {
    expect(service).toBeTruthy();
  }));
});
