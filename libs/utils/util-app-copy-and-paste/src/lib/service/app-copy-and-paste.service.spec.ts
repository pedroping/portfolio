/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppCopyAndPasteService } from './app-copy-and-paste.service';

describe('Service: AppCopyAndPaste', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppCopyAndPasteService]
    });
  });

  it('should ...', inject([AppCopyAndPasteService], (service: AppCopyAndPasteService) => {
    expect(service).toBeTruthy();
  }));
});
