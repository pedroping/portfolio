/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FoldersViewStateService } from './folders-view-state.service';

describe('Service: FoldersState', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoldersViewStateService],
    });
  });

  it('should ...', inject(
    [FoldersViewStateService],
    (service: FoldersViewStateService) => {
      expect(service).toBeTruthy();
    },
  ));
});
