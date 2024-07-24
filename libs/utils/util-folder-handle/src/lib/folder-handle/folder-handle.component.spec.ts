/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FolderHandleComponent } from './folder-handle.component';

describe('FolderHandleComponent', () => {
  let component: FolderHandleComponent;
  let fixture: ComponentFixture<FolderHandleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderHandleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
