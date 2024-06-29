/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContextMenuFacade } from './context-menu-facade.service';

describe('Service: ContextMenuFacade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContextMenuFacade],
    });
  });

  it('should ...', inject([ContextMenuFacade], (service: ContextMenuFacade) => {
    expect(service).toBeTruthy();
  }));
});
