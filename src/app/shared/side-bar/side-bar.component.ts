import { Component } from '@angular/core';
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
export class SideBarComponent {
  comunidadOpen = false;

  toggleComunidad() {
    this.comunidadOpen = !this.comunidadOpen;
  }


  constructor(private authService: AuthService) {

  }

  logout() {
    // Aquí tu lógica moderna: limpiar localStorage, llamar a un AuthService, redirigir, etc.
    this.authService.logout(); // por ejemplo
  }

}
