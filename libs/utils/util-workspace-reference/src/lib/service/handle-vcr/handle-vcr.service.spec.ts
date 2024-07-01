/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HandleVcrService } from './handle-vcr.service';

describe('Service: HandleVcr', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HandleVcrService]
    });
  });

  it('should ...', inject([HandleVcrService], (service: HandleVcrService) => {
    expect(service).toBeTruthy();
  }));
});
