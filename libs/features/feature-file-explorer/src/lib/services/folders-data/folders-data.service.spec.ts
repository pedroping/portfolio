/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FoldersDataService } from './folders-data.service';

describe('Service: FoldersData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoldersDataService]
    });
  });

  it('should ...', inject([FoldersDataService], (service: FoldersDataService) => {
    expect(service).toBeTruthy();
  }));
});
