/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { FileExplorerFacade } from './file-explorer-facade.service';

describe('Service: FileExplorerFacade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileExplorerFacade],
    });
  });

  it('should ...', inject(
    [FileExplorerFacade],
    (service: FileExplorerFacade) => {
      expect(service).toBeTruthy();
    }
  ));
});
