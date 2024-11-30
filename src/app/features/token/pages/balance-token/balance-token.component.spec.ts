import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceTokenComponent } from './balance-token.component';

describe('BalanceTokenComponent', () => {
  let component: BalanceTokenComponent;
  let fixture: ComponentFixture<BalanceTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceTokenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
