/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ContextMenuProgramComponent } from './context-menu-program.component';

describe('ContextMenuProgramComponent', () => {
  let component: ContextMenuProgramComponent;
  let fixture: ComponentFixture<ContextMenuProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContextMenuProgramComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextMenuProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
