import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage-angular';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { AuthService } from './auth/auth.service';
// confirmar si ReactiveFormsModule se deja global o no
// import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    IonicStorageModule,
    SideBarComponent
  ],
  providers: [
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'backoffice-org';

  isAuthenticated: boolean = false;

  constructor(
    private authService: AuthService,
  ) {
    this.isLoggedIn();
  }

  async isLoggedIn() {
    this.isAuthenticated = await this.authService.checkAuthentication();
  }
}
