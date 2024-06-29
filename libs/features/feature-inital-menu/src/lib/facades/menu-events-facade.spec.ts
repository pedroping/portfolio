/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MenuEventsFacade } from './menu-events-facade';

describe('Service: MenuEventsFacade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuEventsFacade],
    });
  });

  it('should ...', inject([MenuEventsFacade], (service: MenuEventsFacade) => {
    expect(service).toBeTruthy();
  }));
});
