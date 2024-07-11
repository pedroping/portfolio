/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SubContextMenuShortByComponent } from './sub-context-menu-short-by.component';

describe('SubContextMenuShortByComponent', () => {
  let component: SubContextMenuShortByComponent;
  let fixture: ComponentFixture<SubContextMenuShortByComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubContextMenuShortByComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubContextMenuShortByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
