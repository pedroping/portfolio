/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OptionSelectedService } from './option-selected.service';

describe('Service: OptionSelected', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OptionSelectedService],
    });
  });

  it('should ...', inject(
    [OptionSelectedService],
    (service: OptionSelectedService) => {
      expect(service).toBeTruthy();
    },
  ));
});
