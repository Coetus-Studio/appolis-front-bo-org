import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: any[] = [];
  loading = false;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.loading = true;
    this.usersService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  editUser(userId: string) {
    this.router.navigate(['/users/edit', userId]);
  }

  deactivateUser(userId: string) {
    if (confirm('Are you sure you want to deactivate this user?')) {
      this.usersService.deactivateUser(userId).subscribe({
        next: () => this.fetchUsers(),
        error: (err) => console.error(err)
      });
    }
  }
}