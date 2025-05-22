import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { catchError, of, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddressComponent } from '../../../../shared/map-org/components/modal-address/modal-address.component';

interface Organization {
  name: string;
  fundation_date: string;
  org_type_id: string;
  description: string;
  main_members: string;
  public_id: string;
  email: string;
  main_address: {
    description: string;
    gm_formatted_address: string;
    geo_point: {
      type: string;
      coordinates: number[];
    };
    is_public: boolean;
  };
}

interface Admin {
  public_id_admin: string;
  admin_fullname: string;
  admin_email: string;
  phone_number: string;
  admin_password?: string; // Password is only required for new admin
}

interface OrganizationType {
  _id: string;
  name: string;
  // Add other properties if the endpoint returns more
}

@Component({
  selector: 'app-organization-signup-wizard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './organization-signup-wizard.component.html',
  styleUrl: './organization-signup-wizard.component.css'
})
export class OrganizationSignupWizardComponent implements OnInit {
  organizationForm!: FormGroup;
  adminForm!: FormGroup;
  loginForm!: FormGroup; // Form for existing admin login

  currentStep = 1;
  adminStep: 'create' | 'login' = 'create'; // 'create' or 'login'

  organizationData: Partial<Organization> = {};
  adminData: Partial<Admin> = {};
  organizationTypes: OrganizationType[] = []; // To store fetched organization types

  organizationExists = false;
  adminEmailExists = false;
  loading = false;
  errorMessage: string | null = null;

  private apiUrl = 'http://localhost:3000/v1/organizations';
  private usersApiUrl = 'http://localhost:3000/v1/users';
  private organizationTypesApiUrl = 'http://localhost:3000/v1/organization-types';

  constructor(private fb: FormBuilder, private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.initOrganizationForm();
    this.initAdminForm();
    this.initLoginForm();
    this.fetchOrganizationTypes(); // Fetch organization types on init
  }

  initOrganizationForm(): void {
    this.organizationForm = this.fb.group({
      name: ['', Validators.required],
      fundation_date: ['', Validators.required],
      org_type_id: ['', Validators.required], // This will now be selected from dropdown
      description: [''],
      main_members: [''],
      public_id: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      main_address: this.fb.group({
        description: [''],
        gm_formatted_address: ['', Validators.required],
        geo_point: this.fb.group({
          type: ['Point', Validators.required],
          coordinates: [[]] // [longitude, latitude] - Removed Validators.required
        }),
        is_public: [true]
      })
    });
  }

  initAdminForm(): void {
    this.adminForm = this.fb.group({
      public_id_admin: ['', Validators.required],
      admin_fullname: ['', Validators.required],
      admin_email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      admin_password: ['', Validators.required]
    });
  }

  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  fetchOrganizationTypes(): void {
    this.loading = true;
    this.errorMessage = null;
    // Using the provided Authorization header from the curl command
    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzIzMjc2YjZjNmU5YzlkZjA0OGVlNTUiLCJlbWFpbCI6ImNvbnRhY3RvQGFwcG9saXMubmV0IiwiaXNfYWN0aXZlIjpmYWxzZSwiaXNfdmVyaWZpZWQiOmZhbHNlLCJyb2xlc0J5T3JnYW5pemF0aW9uIjpbXSwiaWF0IjoxNzQ3NjcyMDcxLCJleHAiOjE3NDc2NzU2NzF9.6dI7srLGacoSuSc3zsGekWKNQ1dl81OJM5KAEQ2N6Qk'
    });

    this.http.get<OrganizationType[]>(this.organizationTypesApiUrl, { headers }).pipe(
      tap(types => {
        this.organizationTypes = types;
        console.log('Organization types fetched:', this.organizationTypes);
      }),
      catchError(error => {
        console.error('Error fetching organization types:', error);
        this.errorMessage = 'Error fetching organization types. Please try again.';
        return of([]); // Return empty array on error
      })
    ).subscribe(() => {
      this.loading = false;
    });
  }


  validateOrganizationPublicId(): void {
    if (this.organizationForm.get('public_id')?.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    const publicId = this.organizationForm.get('public_id')?.value;
    this.http.get(`${this.apiUrl}/exists/public-id/${publicId}`).pipe(
      tap((response: any) => {
        this.organizationExists = response.exists;
        if (this.organizationExists) {
          this.errorMessage = 'An organization with this Public ID already exists.';
        } else {
          this.organizationData = this.organizationForm.value;
          this.currentStep = 2;
          console.log('Organization data collected:', this.organizationData);
          // Reset admin form and state when moving to step 2
          this.adminForm.reset();
          this.loginForm.reset();
          this.adminStep = 'create';
          this.adminEmailExists = false;
        }
      }),
      catchError(error => {
        console.error('Error checking organization existence:', error);
        this.errorMessage = 'Error checking organization existence. Please try again.';
        this.organizationExists = false; // Assume not exists on error for signup flow
        return of(null);
      })
    ).subscribe(() => {
      this.loading = false;
    });
  }

  validateAdminEmail(): void {
    if (this.adminForm.get('admin_email')?.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    const adminEmail = this.adminForm.get('admin_email')?.value;
    this.http.get(`${this.usersApiUrl}/exists/${adminEmail}`).pipe(
      tap((response: any) => {
        this.adminEmailExists = response.exists;
        if (this.adminEmailExists) {
          this.adminStep = 'login'; // Switch to login tab if email exists
          this.loginForm.patchValue({ email: adminEmail }); // Pre-fill login email
          this.errorMessage = 'This email is already registered. Please log in.';
        } else {
          this.adminStep = 'create'; // Stay on create tab if email does not exist
          this.adminForm.patchValue({ admin_email: adminEmail }); // Keep email in create form
          this.errorMessage = null;
        }
      }),
      catchError(error => {
        console.error('Error checking admin email existence:', error);
        this.errorMessage = 'Error checking admin email existence. Please try again.';
        this.adminEmailExists = false; // Assume not exists on error
        this.adminStep = 'create'; // Default to create on error
        return of(null);
      })
    ).subscribe(() => {
      this.loading = false;
    });
  }

  // Method to handle moving to the next step (will be called after validation)
  nextStep(): void {
    if (this.currentStep === 1) {
      this.validateOrganizationPublicId();
    } else if (this.currentStep === 2) {
      // Logic for step 2 next button depends on the active tab
      if (this.adminStep === 'create') {
        if (this.adminForm.valid) {
          this.adminData = this.adminForm.value;
          this.submitSignup(); // Proceed to final submission for new admin
        }
      } else if (this.adminStep === 'login') {
        if (this.loginForm.valid) {
          this.loginAndSignupOrganization(); // Call the new method for existing admin
        }
      }
    }
  }

  // Method to handle moving back to the previous step
  prevStep(): void {
    this.currentStep--;
    this.errorMessage = null; // Clear error message on step change
  }

  // Method to handle the final signup submission
  submitSignup(): void {
    if (this.organizationData && this.adminData) {
      this.loading = true;
      this.errorMessage = null;
      const signupPayload = {
        admin: this.adminData,
        organization: this.organizationData
      };

      this.http.post(`${this.apiUrl}/signup`, signupPayload).pipe(
        tap((response) => {
          console.log('Signup successful:', response);
          // Handle successful signup (e.g., show success message, redirect)
          this.errorMessage = 'Organization and Admin registered successfully!';
          // Optionally reset forms or navigate
        }),
        catchError(error => {
          console.error('Signup failed:', error);
          this.errorMessage = 'Signup failed. Please try again.';
          // Handle signup error (e.g., show error message)
          return of(null);
        })
      ).subscribe(() => {
        this.loading = false;
      });
    } else {
      this.errorMessage = 'Missing organization or admin data for signup.';
    }
  }

  // Method to switch between create and login tabs
  switchAdminStep(step: 'create' | 'login'): void {
    this.adminStep = step;
    this.errorMessage = null; // Clear error message on tab switch
  }

  // Method to open the native date picker
  openDatePicker(inputElement: HTMLInputElement): void {
    inputElement.showPicker();
  }
  // Method to handle login and then organization signup for existing admin
  loginAndSignupOrganization(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    const loginPayload = this.loginForm.value;

    // First, attempt to log in the existing user
    this.http.post<any>('http://localhost:3000/v1/auth/signin', loginPayload).pipe(
      tap(loginResponse => {
        console.log('Login successful:', loginResponse);
        const jwtToken = loginResponse.accessToken; // Assuming the token is in a 'token' field

        if (!jwtToken) {
          this.errorMessage = 'Login successful, but no token received.';
          this.loading = false;
          return;
        }

        // Now, submit the organization data with the received token
        const organizationPayload = this.organizationData;
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        });

        this.http.post('http://localhost:3000/v1/organizations/signup-existing-admin', organizationPayload, { headers }).pipe(
          tap(signupResponse => {
            console.log('Organization signup with existing admin successful:', signupResponse);
            this.errorMessage = 'Organization registered successfully with existing admin!';
            // Handle successful signup (e.g., redirect)
          }),
          catchError(signupError => {
            console.error('Organization signup with existing admin failed:', signupError);
            this.errorMessage = 'Organization signup failed. Please try again.';
            return of(null);
          })
        ).subscribe(() => {
          this.loading = false;
        });

      }),
      catchError(loginError => {
        console.error('Login failed:', loginError);
        this.errorMessage = 'Login failed. Please check your credentials.';
        this.loading = false;
        return of(null);
      })
    ).subscribe();
  }

  // Method to open the address modal
  openAddressModal(): void {
    const dialogRef = this.dialog.open(ModalAddressComponent, {
      width: '600px', // Adjust width as needed
      data: { /* optional data to pass to the modal */ }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onAddressSelected(result);
      }
    });
  }

  // Method to handle the selected address from the modal
  onAddressSelected(addressData: any): void {
    console.log('Address selected:', addressData);
    // Update the main_address form group with the selected address data
    this.organizationForm.get('main_address')?.patchValue({
      description: addressData.gm_formatted_address, // Using formatted address as description for now
      gm_formatted_address: addressData.gm_formatted_address,
      geo_point: {
        type: 'Point',
        coordinates: [addressData.location.lng, addressData.location.lat] // Assuming the modal returns { lat, lng }
      },
      is_public: true
    });
  }
}
