/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiLoginSplashScreenComponent } from './ui-login-splash-screen.component';

describe('UiLoginSplashScreenComponent', () => {
  let component: UiLoginSplashScreenComponent;
  let fixture: ComponentFixture<UiLoginSplashScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiLoginSplashScreenComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiLoginSplashScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
