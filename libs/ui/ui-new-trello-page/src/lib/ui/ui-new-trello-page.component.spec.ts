/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UiNewTrelloPageComponent } from './ui-new-trello-page.component';

describe('UiNewTrelloPageComponent', () => {
  let component: UiNewTrelloPageComponent;
  let fixture: ComponentFixture<UiNewTrelloPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UiNewTrelloPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiNewTrelloPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
