/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PreventElementsService } from './prevent-elements.service';

describe('Service: PreventElements', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreventElementsService]
    });
  });

  it('should ...', inject([PreventElementsService], (service: PreventElementsService) => {
    expect(service).toBeTruthy();
  }));
});
