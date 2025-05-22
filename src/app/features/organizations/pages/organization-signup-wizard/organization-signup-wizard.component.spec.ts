import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationSignupWizardComponent } from './organization-signup-wizard.component';

describe('OrganizationSignupWizardComponent', () => {
  let component: OrganizationSignupWizardComponent;
  let fixture: ComponentFixture<OrganizationSignupWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationSignupWizardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationSignupWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
