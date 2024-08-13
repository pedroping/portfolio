/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UiHelpAndSuportPageComponent } from './ui-help-and-suport-page.component';

describe('UiHelpAndSuportPageComponent', () => {
  let component: UiHelpAndSuportPageComponent;
  let fixture: ComponentFixture<UiHelpAndSuportPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiHelpAndSuportPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiHelpAndSuportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
