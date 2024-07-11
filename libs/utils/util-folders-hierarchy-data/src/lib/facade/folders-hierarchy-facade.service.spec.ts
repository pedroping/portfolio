/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FoldersHierarchyFacade } from './folders-hierarchy-facade.service';

describe('Service: FoldersHierarchyFacade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoldersHierarchyFacade],
    });
  });

  it('should ...', inject(
    [FoldersHierarchyFacade],
    (service: FoldersHierarchyFacade) => {
      expect(service).toBeTruthy();
    },
  ));
});
