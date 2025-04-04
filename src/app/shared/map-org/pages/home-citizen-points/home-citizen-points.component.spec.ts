import { ComponentFixture, TestBed } from '@angular/core/testing';
import HomeCitizenPointsComponent from './home-citizen-points.component';
// import HomeLocationsComponent from '../../components/home-locations.component';

describe('HomeLocationsComponent', () => {
  let component: HomeCitizenPointsComponent;
  let fixture: ComponentFixture<HomeCitizenPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCitizenPointsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCitizenPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
