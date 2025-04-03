import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRequirementsComponent } from './home-requirements.component';

describe('HomeRequirementsComponent', () => {
  let component: HomeRequirementsComponent;
  let fixture: ComponentFixture<HomeRequirementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeRequirementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
