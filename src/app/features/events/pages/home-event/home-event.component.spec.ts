import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEventComponent } from './home-event.component';

describe('HomeEventComponent', () => {
  let component: HomeEventComponent;
  let fixture: ComponentFixture<HomeEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
