/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ElementCreatorService } from './element-creator.service';

describe('Service: ElementCreator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElementCreatorService]
    });
  });

  it('should ...', inject([ElementCreatorService], (service: ElementCreatorService<unknown>) => {
    expect(service).toBeTruthy();
  }));
});
