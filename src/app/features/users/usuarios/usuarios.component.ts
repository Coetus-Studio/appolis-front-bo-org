import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UsuariosService } from './services/usuarios.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  // formulario de login
  email: FormControl = new FormControl('contacto@appolis.net');
  password: FormControl = new FormControl('password');
  
  
  isLoading: boolean = false;
  errorMessage:String = '';
  

  constructor(
    private authService: AuthService,
    private usuarioService: UsuariosService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.isLoading = true;
      console.log('AuthService checkAuthentication in UsuariosComponent');
      const isAuthenticated: boolean = await this.authService.checkAuthentication();
  
      if(!isAuthenticated) {
        this.router.navigate(['/home']);
      } 
    } catch (error) {
      console.error('Error fetching usuarios:', error);
    } finally {
      this.isLoading = false;
    }    
  }


}
