/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TrashHandle } from './trash-handle.service';

describe('Service: TrashHandle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrashHandle],
    });
  });

  it('should ...', inject([TrashHandle], (service: TrashHandle) => {
    expect(service).toBeTruthy();
  }));
});
