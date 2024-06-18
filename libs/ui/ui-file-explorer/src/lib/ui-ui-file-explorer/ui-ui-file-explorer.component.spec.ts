import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiUiFileExplorerComponent } from './ui-file-explorer.component';

describe('UiUiFileExplorerComponent', () => {
  let component: UiUiFileExplorerComponent;
  let fixture: ComponentFixture<UiUiFileExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiUiFileExplorerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiUiFileExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
