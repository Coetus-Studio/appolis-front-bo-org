import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCitizenPointsComponent } from './list-citizen-points.component';

describe('ListCitizenPointsComponent', () => {
  let component: ListCitizenPointsComponent;
  let fixture: ComponentFixture<ListCitizenPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCitizenPointsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCitizenPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
