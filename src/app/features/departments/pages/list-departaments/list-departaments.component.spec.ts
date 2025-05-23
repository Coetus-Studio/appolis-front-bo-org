import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDepartamentsComponent } from './list-departaments.component';

describe('ListDepartamentsComponent', () => {
  let component: ListDepartamentsComponent;
  let fixture: ComponentFixture<ListDepartamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDepartamentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDepartamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
