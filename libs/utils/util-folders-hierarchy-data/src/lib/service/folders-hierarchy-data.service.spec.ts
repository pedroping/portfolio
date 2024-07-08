/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FoldersHierarchyDataService } from './folders-hierarchy-data.service';

describe('Service: FoldersData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoldersHierarchyDataService]
    });
  });

  it('should ...', inject([FoldersHierarchyDataService], (service: FoldersHierarchyDataService) => {
    expect(service).toBeTruthy();
  }));
});
