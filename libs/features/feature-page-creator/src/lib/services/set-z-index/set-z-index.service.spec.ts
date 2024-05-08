/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SetZIndexService } from './set-z-index.service';

describe('Service: SetZIndex', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SetZIndexService],
    });
  });

  it('should ...', inject([SetZIndexService], (service: SetZIndexService) => {
    expect(service).toBeTruthy();
  }));
});
