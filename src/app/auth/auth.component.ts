import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,  
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  email: FormControl = new FormControl('contacto@appolis.net');
  password: FormControl = new FormControl('password');
  isLoading: boolean = false;
  errorMessage:String = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('AuthComponent ngOnInit');
    this.authService.checkAuthentication().then((authenticated) => {
      if(authenticated) {
        this.router.navigate(['/home']);
      }
    });
  }

  async login() {
    try {
      this.errorMessage = ''
      let emailFormControl : string = this.email.value;
      let passwordFormControl : string = this.password.value;

      if(emailFormControl === '' || passwordFormControl === '') {        
        return;
      }

      this.isLoading = true; // Set loading to true

      await this.authService.login({
        email: emailFormControl,
        password: passwordFormControl,
      });

      this.isLoading = false; // Set loading to false on success

      await this.router.navigate(['/home']);

    } catch (error) {
      console.error('erroasdr',(error as HttpErrorResponse).statusText);

      this.errorMessage = (error as HttpErrorResponse).statusText;
      this.isLoading = false; // Set loading to false on success
    }
  }
}
