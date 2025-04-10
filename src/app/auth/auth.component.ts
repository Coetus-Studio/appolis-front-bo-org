import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
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
export class AuthComponent implements OnDestroy {
  email: FormControl = new FormControl('contacto@appolis.net');
  password: FormControl = new FormControl('password');
  isLoading: boolean = false;
  errorMessage:String = '';
  rol: string = '';

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    console.log('Destruye auth component 1');
  }

  ngOnInit() {
    this.authService.authState$.subscribe(authenticated => {
      if (authenticated) {
        this.router.navigate(['/home']);
      }
    });

    // También por si refresca en login con sesión activa
    this.authService.checkAuthentication().then(authenticated => {
      if (authenticated) {
        this.router.navigate(['/home']);
      }
    });
  }

  async login() {
    try {

      this.errorMessage = ''
      const emailFormControl : string = this.email.value;
      const passwordFormControl : string = this.password.value;


      if(emailFormControl === '' || passwordFormControl === '') {
        return;
      }

      this.isLoading = true; // Set loading to true

      const response = await this.authService.login({
        email: emailFormControl,
        password: passwordFormControl,
      });

      this.isLoading = false; // Set loading to false on success

      // this.rol = this.rol,
      // console.log('ROL', response.roles);
      // console.log('ID', this.rol);

      await this.router.navigate(['/home']);
    } catch (error) {
      console.error('erroasdr',(error as HttpErrorResponse).statusText);

      this.errorMessage = (error as HttpErrorResponse).statusText;
      this.isLoading = false; // Set loading to false on success
    }
  }
}
