import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenMapFormComponent } from './citizen-map-form.component';

describe('CitizenMapFormComponent', () => {
  let component: CitizenMapFormComponent;
  let fixture: ComponentFixture<CitizenMapFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenMapFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenMapFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
