/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppCopyAndPasteFacade } from './app-copy-and-paste-facade.service';

describe('Service: AppCopyAndPasteFacade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppCopyAndPasteFacade],
    });
  });

  it('should ...', inject(
    [AppCopyAndPasteFacade],
    (service: AppCopyAndPasteFacade) => {
      expect(service).toBeTruthy();
    },
  ));
});
