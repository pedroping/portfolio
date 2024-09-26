/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FileRenameComponent } from './file-rename.component';

describe('FileRenameComponent', () => {
  let component: FileRenameComponent;
  let fixture: ComponentFixture<FileRenameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FileRenameComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileRenameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
