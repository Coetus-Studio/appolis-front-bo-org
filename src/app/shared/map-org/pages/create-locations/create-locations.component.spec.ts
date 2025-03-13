import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLocationsComponent } from './create-locations.component';

describe('CreateLocationsComponent', () => {
  let component: CreateLocationsComponent;
  let fixture: ComponentFixture<CreateLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLocationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
