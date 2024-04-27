/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LastZIndexService } from './last-z-index.service';

describe('Service: LastZIndex', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LastZIndexService]
    });
  });

  it('should ...', inject([LastZIndexService], (service: LastZIndexService) => {
    expect(service).toBeTruthy();
  }));
});
