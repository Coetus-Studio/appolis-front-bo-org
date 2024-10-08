import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthWalletComponent } from './auth-wallet.component';

describe('AuthWalletComponent', () => {
  let component: AuthWalletComponent;
  let fixture: ComponentFixture<AuthWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthWalletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
