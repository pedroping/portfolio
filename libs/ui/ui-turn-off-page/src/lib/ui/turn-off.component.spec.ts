/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TurnOffComponent } from './turn-off.component';

describe('TurnOffComponent', () => {
  let component: TurnOffComponent;
  let fixture: ComponentFixture<TurnOffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnOffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
