/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CreateFilesAndFoldersService } from './create-files-and-folders.service';

describe('Service: CreateFolderPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateFilesAndFoldersService]
    });
  });

  it('should ...', inject([CreateFilesAndFoldersService], (service: CreateFilesAndFoldersService) => {
    expect(service).toBeTruthy();
  }));
});
