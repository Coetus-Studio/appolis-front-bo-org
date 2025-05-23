import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import BalanceTokenComponent from '../../features/token/pages/balance-token/balance-token.component';
import { routes } from '../../app.routes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-side-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit {
  comunidadOpen = false;
  userAdmin = false;

  registeredUserRole: string | null | undefined = '';

  constructor(private authService: AuthService) {

  }
  ngOnInit(): void {
    this.getUserRol();
  }

  toggleComunidad() {
    this.comunidadOpen = !this.comunidadOpen;
  }
  logout() {
    // Aquí tu lógica moderna: limpiar localStorage, llamar a un AuthService, redirigir, etc.
    this.authService.logout(); // por ejemplo
  }

  async getUserRol() {
    this.authService.userRolOrganization$.subscribe((userRol) => {
      console.log("userRol => ", userRol)
      this.registeredUserRole = userRol;

      if (this.registeredUserRole === 'Administrador') {
        console.log('Usuario Administrador autenticado, tiene todos los permisos.')
        this.userAdmin = true;
      } else {
        this.userAdmin = false;
      }
    });

    this.authService.getUserRol();

  }


}
