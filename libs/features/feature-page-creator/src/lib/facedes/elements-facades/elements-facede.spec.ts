/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ElementsFacede } from './elements-facede';

describe('Service: ElementsFacede', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElementsFacede],
    });
  });

  it('should ...', inject([ElementsFacede], (service: ElementsFacede) => {
    expect(service).toBeTruthy();
  }));
});
