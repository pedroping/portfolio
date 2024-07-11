/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SubContextMenuViewComponent } from './sub-context-menu-view.component';

describe('SubContextMenuViewComponent', () => {
  let component: SubContextMenuViewComponent;
  let fixture: ComponentFixture<SubContextMenuViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubContextMenuViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubContextMenuViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
