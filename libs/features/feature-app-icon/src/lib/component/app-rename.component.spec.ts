/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppRenameComponent } from './app-rename.component';

describe('AppRenameComponent', () => {
  let component: AppRenameComponent;
  let fixture: ComponentFixture<AppRenameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppRenameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRenameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
