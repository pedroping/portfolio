/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppHolderComponent } from './app-holder.component';

describe('AppHolderComponent', () => {
  let component: AppHolderComponent;
  let fixture: ComponentFixture<AppHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppHolderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
