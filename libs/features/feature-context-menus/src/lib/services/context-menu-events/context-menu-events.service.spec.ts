/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContextMenuEventsService } from './context-menu-events.service';

describe('Service: ContextMenuEvents', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContextMenuEventsService]
    });
  });

  it('should ...', inject([ContextMenuEventsService], (service: ContextMenuEventsService) => {
    expect(service).toBeTruthy();
  }));
});
