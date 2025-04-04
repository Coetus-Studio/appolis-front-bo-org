import { ComponentFixture, TestBed } from '@angular/core/testing';
import CitizenPointsFormComponent from './citizen-point-form.component';


describe('CitizenMapFormComponent', () => {
  let component: CitizenPointsFormComponent;
  let fixture: ComponentFixture<CitizenPointsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenPointsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenPointsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
