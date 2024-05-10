/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AnimationsFacade } from './animations-facade.service';

describe('Service: AnimationsFacade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnimationsFacade],
    });
  });

  it('should ...', inject([AnimationsFacade], (service: AnimationsFacade) => {
    expect(service).toBeTruthy();
  }));
});
