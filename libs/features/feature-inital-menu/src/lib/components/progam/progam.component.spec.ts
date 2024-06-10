/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProgamComponent } from './progam.component';

describe('ProgamComponent', () => {
  let component: ProgamComponent;
  let fixture: ComponentFixture<ProgamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
