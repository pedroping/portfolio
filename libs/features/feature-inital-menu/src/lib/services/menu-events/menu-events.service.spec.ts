/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MenuEventsService } from './menu-events.service';

describe('Service: MenuEvents', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuEventsService]
    });
  });

  it('should ...', inject([MenuEventsService], (service: MenuEventsService) => {
    expect(service).toBeTruthy();
  }));
});
