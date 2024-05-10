/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BuildAnimation } from './build-animation.service';

describe('Service: BuildAnimation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuildAnimation],
    });
  });

  it('should ...', inject([BuildAnimation], (service: BuildAnimation) => {
    expect(service).toBeTruthy();
  }));
});
