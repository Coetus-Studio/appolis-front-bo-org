import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOpportunitiesComponent } from './list-opportunities.component';

describe('ListOpportunitiesComponent', () => {
  let component: ListOpportunitiesComponent;
  let fixture: ComponentFixture<ListOpportunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOpportunitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
