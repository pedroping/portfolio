import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturesFeatureAppIconComponent } from './features-feature-app-icon.component';

describe('FeaturesFeatureAppIconComponent', () => {
  let component: FeaturesFeatureAppIconComponent;
  let fixture: ComponentFixture<FeaturesFeatureAppIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesFeatureAppIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturesFeatureAppIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
