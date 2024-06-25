/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FoldersStateService } from './folders-state.service';

describe('Service: FoldersState', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoldersStateService]
    });
  });

  it('should ...', inject([FoldersStateService], (service: FoldersStateService) => {
    expect(service).toBeTruthy();
  }));
});
