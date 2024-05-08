import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtilsUtilAnimationsComponent } from './utils-util-animations.component';

describe('UtilsUtilAnimationsComponent', () => {
  let component: UtilsUtilAnimationsComponent;
  let fixture: ComponentFixture<UtilsUtilAnimationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilsUtilAnimationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UtilsUtilAnimationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
