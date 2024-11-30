import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakingAppolisTokenComponent } from './staking-appolis-token.component';

describe('StakingAppolisTokenComponent', () => {
  let component: StakingAppolisTokenComponent;
  let fixture: ComponentFixture<StakingAppolisTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StakingAppolisTokenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StakingAppolisTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
