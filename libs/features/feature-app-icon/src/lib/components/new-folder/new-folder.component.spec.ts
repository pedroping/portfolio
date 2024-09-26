/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewFolderComponent } from './new-folder.component';

describe('NewFolderComponent', () => {
  let component: NewFolderComponent;
  let fixture: ComponentFixture<NewFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
