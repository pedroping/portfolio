/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContextMenuEvents } from './context-menu-events.service';

describe('Service: ContextMenuEvents', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContextMenuEvents],
    });
  });

  it('should ...', inject([ContextMenuEvents], (service: ContextMenuEvents) => {
    expect(service).toBeTruthy();
  }));
});
