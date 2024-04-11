/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ElementsData } from './elements-data.service';

describe('Service: ElementsData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElementsData],
    });
  });

  it('should ...', inject([ElementsData], (service: ElementsData) => {
    expect(service).toBeTruthy();
  }));
});
