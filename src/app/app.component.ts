import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage-angular';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { AuthService } from './auth/auth.service';
import { NavBarComponent } from "./shared/nav-bar/nav-bar.component";
// confirmar si ReactiveFormsModule se deja global o no
// import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    IonicStorageModule,
    SideBarComponent,
    NavBarComponent
],
  providers: [
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'backoffice-org';

  isAuthenticated: boolean = false;

  showAuthComponent: boolean = true;

  constructor(
    private authService: AuthService,
  ) {
    console.log("isLogged")
    // this.isLoggedIn();
  }
  ngOnInit(): void {
    this.authService.authState$.subscribe((auth) => {
      console.log("Estado de la autenticacion: ", auth)
      this.isAuthenticated = auth;
    });
    this.authService.checkAuthentication();
  }

  destroyAuthComponent() {

  }

  // async isLoggedIn() {
  //   this.isAuthenticated = await this.authService.checkAuthentication();
  // }
}
