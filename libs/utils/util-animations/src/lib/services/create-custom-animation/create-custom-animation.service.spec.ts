/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CreateCustomAnimationService } from './create-custom-animation.service';

describe('Service: CreateCustomAnimation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateCustomAnimationService]
    });
  });

  it('should ...', inject([CreateCustomAnimationService], (service: CreateCustomAnimationService) => {
    expect(service).toBeTruthy();
  }));
});
