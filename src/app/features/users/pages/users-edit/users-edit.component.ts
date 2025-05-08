import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { OrganizationService, Organization } from '../../../organizations/services/organization.service'; // Import OrganizationService and Organization

@Component({
  selector: 'app-users-edit',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    // Removed Material Modules
  ],
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {
  userForm: FormGroup;
  userId: string;
  loading = false;
  availableRoles = ['admin', 'editor', 'viewer'];
  // organizations: Organization[] = []; // Removed as no longer needed

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private usersService: UsersService,
    private fb: FormBuilder,
    // private organizationService: OrganizationService // Removed as no longer needed
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roles: this.fb.array([])
    });

    this.userId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.fetchUser();
    // this.fetchOrganizations(); // Removed as no longer needed
  }

  getOrganizationName(orgId: string): string {
    const rolesFormArray = this.userForm.get('roles') as FormArray;
    const roleControl = rolesFormArray.controls.find(control => control.get('organizationId')?.value === orgId);
    return roleControl?.get('organization')?.value?.name || 'Unknown Organization';
  }

  fetchUser() {
    this.loading = true;
    this.usersService.getUser(this.userId).subscribe({
      next: (user) => {
        console.log('USER object received:', user);
        console.log('rolesByOrganization:', user.rolesByOrganization);
        this.userForm.patchValue({
          name: user.name,
          email: user.email,
        });
        this.setRoles(user.rolesByOrganization || []); // Use rolesByOrganization
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // fetchOrganizations() { // Removed as no longer needed
  //   this.organizationService.getOrganizations().subscribe({
  //     next: (orgs) => {
  //       this.organizations = orgs;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching organizations:', err);
  //     }
  //   });
  // }

  setRoles(rolesByOrganization: any[]) {
    const rolesFormArray = this.userForm.get('roles') as FormArray;
    // Clear existing roles before setting new ones
    while (rolesFormArray.length !== 0) {
      rolesFormArray.removeAt(0);
    }
    rolesByOrganization.forEach(roleOrg => {
      rolesFormArray.push(this.fb.group({
        organizationId: [roleOrg.organization._id, Validators.required],
        role: [roleOrg.role.name, Validators.required],
        organization: [roleOrg.organization] // Store the organization object
      }));
    });
  }

  addRole() {
    const rolesFormArray = this.userForm.get('roles') as FormArray;
    rolesFormArray.push(this.fb.group({
      organizationId: ['', Validators.required], // Default empty value
      role: ['', Validators.required],
      organization: [null] // Initialize organization as null
    }));
  }

  removeRole(index: number) {
    const rolesFormArray = this.userForm.get('roles') as FormArray;
    rolesFormArray.removeAt(index);
  }

  onSubmit() {
    if (this.userForm.valid) {
      // Before submitting, remove the 'organization' field from the roles array
      const rolesToSubmit = this.rolesFormArray.value.map((role: any) => {
        const { organization, ...rest } = role;
        return rest;
      });

      const userDataToSubmit = {
        ...this.userForm.value,
        roles: rolesToSubmit
      };


      this.usersService.updateUser(this.userId, userDataToSubmit).subscribe({
        next: () => {
          alert('User updated successfully!');
          this.router.navigate(['/users']);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  get rolesFormArray() {
    return this.userForm.get('roles') as FormArray;
  }
}