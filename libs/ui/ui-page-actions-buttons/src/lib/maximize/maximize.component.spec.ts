/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MaximizeComponent } from './maximize.component';

describe('MaximizeComponent', () => {
  let component: MaximizeComponent;
  let fixture: ComponentFixture<MaximizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaximizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaximizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
