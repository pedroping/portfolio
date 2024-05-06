/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventsFacadesService } from './events-facades.service';

describe('Service: EventsFacades', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsFacadesService]
    });
  });

  it('should ...', inject([EventsFacadesService], (service: EventsFacadesService) => {
    expect(service).toBeTruthy();
  }));
});
