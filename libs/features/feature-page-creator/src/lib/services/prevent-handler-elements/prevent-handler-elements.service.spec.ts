/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PreventHandlerElements } from './prevent-handler-elements.service';

describe('Service: PreventHandlerElements', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreventHandlerElements],
    });
  });

  it('should ...', inject(
    [PreventHandlerElements],
    (service: PreventHandlerElements) => {
      expect(service).toBeTruthy();
    },
  ));
});
