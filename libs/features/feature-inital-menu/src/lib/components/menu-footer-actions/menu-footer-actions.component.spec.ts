/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MenuFooterActionsComponent } from './menu-footer-actions.component';

describe('MenuFooterActionsComponent', () => {
  let component: MenuFooterActionsComponent;
  let fixture: ComponentFixture<MenuFooterActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuFooterActionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuFooterActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
