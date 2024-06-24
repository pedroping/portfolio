/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SubContextMenuIconsComponent } from './sub-context-menu-icons.component';

describe('SubContextMenuIconsComponent', () => {
  let component: SubContextMenuIconsComponent;
  let fixture: ComponentFixture<SubContextMenuIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubContextMenuIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubContextMenuIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
