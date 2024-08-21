/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TurnOffPageComponent } from './turn-off-page.component';

describe('TurnOffPageComponent', () => {
  let component: TurnOffPageComponent;
  let fixture: ComponentFixture<TurnOffPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnOffPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnOffPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
