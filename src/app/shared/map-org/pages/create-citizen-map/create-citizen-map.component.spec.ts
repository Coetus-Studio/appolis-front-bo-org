import { ComponentFixture, TestBed } from '@angular/core/testing';

import  CreateCitizenMapComponent  from './create-citizen-map.component';

describe('CreateLocationsComponent', () => {
  let component: CreateCitizenMapComponent;
  let fixture: ComponentFixture<CreateCitizenMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCitizenMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCitizenMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
