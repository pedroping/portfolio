import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturesFeatureInitalMenuComponent } from './features-feature-inital-menu.component';

describe('FeaturesFeatureInitalMenuComponent', () => {
  let component: FeaturesFeatureInitalMenuComponent;
  let fixture: ComponentFixture<FeaturesFeatureInitalMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesFeatureInitalMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturesFeatureInitalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
