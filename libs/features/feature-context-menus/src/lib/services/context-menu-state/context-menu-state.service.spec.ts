/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContextMenuStateService } from './context-menu-state.service';

describe('Service: ContextMenuStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContextMenuStateService],
    });
  });

  it('should ...', inject([ContextMenuStateService], (service: ContextMenuStateService) => {
    expect(service).toBeTruthy();
  }));
});
