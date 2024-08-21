/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UiTurnOffSplashScreenComponent } from './ui-turn-off-splash-screen.component';

describe('UiTurnOffSplashScreenComponent', () => {
  let component: UiTurnOffSplashScreenComponent;
  let fixture: ComponentFixture<UiTurnOffSplashScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiTurnOffSplashScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiTurnOffSplashScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
