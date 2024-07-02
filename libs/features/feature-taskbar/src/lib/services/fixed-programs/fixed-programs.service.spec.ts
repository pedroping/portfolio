/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FixedProgramsService } from './fixed-programs.service';

describe('Service: FixedPrograms', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FixedProgramsService]
    });
  });

  it('should ...', inject([FixedProgramsService], (service: FixedProgramsService) => {
    expect(service).toBeTruthy();
  }));
});
