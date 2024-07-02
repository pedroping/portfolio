/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaskbarFacade } from './taskbar-facade.service';

describe('Service: TaskbarFacade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskbarFacade],
    });
  });

  it('should ...', inject([TaskbarFacade], (service: TaskbarFacade) => {
    expect(service).toBeTruthy();
  }));
});
