/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ElementsFacade } from './elements-facade';

describe('Service: ElementsFacade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElementsFacade],
    });
  });

  it('should ...', inject([ElementsFacade], (service: ElementsFacade) => {
    expect(service).toBeTruthy();
  }));
});
