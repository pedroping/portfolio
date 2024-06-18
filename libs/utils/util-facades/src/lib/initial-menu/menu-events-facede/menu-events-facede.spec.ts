/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MenuEventsFacede } from './menu-events-facede';

describe('Service: MenuEventsFacede', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuEventsFacede],
    });
  });

  it('should ...', inject([MenuEventsFacede], (service: MenuEventsFacede) => {
    expect(service).toBeTruthy();
  }));
});
