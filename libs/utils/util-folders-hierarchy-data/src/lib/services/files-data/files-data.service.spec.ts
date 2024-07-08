/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FilesDataService } from './files-data.service';

describe('Service: FilesData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilesDataService]
    });
  });

  it('should ...', inject([FilesDataService], (service: FilesDataService) => {
    expect(service).toBeTruthy();
  }));
});
