import { ComponentFixture, TestBed } from '@angular/core/testing';

import  CreateCitizenPointComponent  from './create-citizen-point.component';

describe('CreateCitizenPointComponent', () => {
  let component: CreateCitizenPointComponent;
  let fixture: ComponentFixture<CreateCitizenPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCitizenPointComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCitizenPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
