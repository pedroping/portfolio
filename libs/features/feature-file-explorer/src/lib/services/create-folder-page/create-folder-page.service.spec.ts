/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CreateFolderPageService } from './create-folder-page.service';

describe('Service: CreateFolderPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateFolderPageService]
    });
  });

  it('should ...', inject([CreateFolderPageService], (service: CreateFolderPageService) => {
    expect(service).toBeTruthy();
  }));
});
