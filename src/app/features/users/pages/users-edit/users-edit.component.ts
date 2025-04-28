import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-users-edit',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule
  ],
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {
  userForm: FormGroup;
  userId: string;
  loading = false;
  availableRoles = ['admin', 'editor', 'viewer'];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private usersService: UsersService,
    private fb: FormBuilder
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
  }

  fetchUser() {
    this.loading = true;
    this.usersService.getUser(this.userId).subscribe({
      next: (user) => {
        this.userForm.patchValue({
          name: user.name,
          email: user.email,
        });
        this.setRoles(user.roles || []);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  setRoles(roles: any[]) {
    const rolesFormArray = this.userForm.get('roles') as FormArray;
    roles.forEach(role => {
      rolesFormArray.push(this.fb.group({
        organizationId: [role.organizationId, Validators.required],
        role: [role.role, Validators.required]
      }));
    });
  }

  addRole() {
    const rolesFormArray = this.userForm.get('roles') as FormArray;
    rolesFormArray.push(this.fb.group({
      organizationId: ['', Validators.required],
      role: ['', Validators.required]
    }));
  }

  removeRole(index: number) {
    const rolesFormArray = this.userForm.get('roles') as FormArray;
    rolesFormArray.removeAt(index);
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.usersService.updateUser(this.userId, this.userForm.value).subscribe({
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