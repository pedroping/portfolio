/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SingleSelectedService } from './single-selected.service';

describe('Service: SingleSelected', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SingleSelectedService]
    });
  });

  it('should ...', inject([SingleSelectedService], (service: SingleSelectedService) => {
    expect(service).toBeTruthy();
  }));
});
