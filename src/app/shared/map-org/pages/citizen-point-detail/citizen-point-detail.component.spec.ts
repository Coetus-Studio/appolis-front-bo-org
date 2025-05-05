import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenPointDetailComponent } from './citizen-point-detail.component';

describe('CitizenPointDetailComponent', () => {
  let component: CitizenPointDetailComponent;
  let fixture: ComponentFixture<CitizenPointDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitizenPointDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitizenPointDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
