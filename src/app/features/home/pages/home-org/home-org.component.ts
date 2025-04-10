import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../auth/auth.service';
import { NavBarComponent } from '../../../../shared/nav-bar/nav-bar.component';
import { SideBarComponent } from '../../../../shared/side-bar/side-bar.component';

@Component({
  selector: 'app-home-org',
  standalone: true,
  imports: [NavBarComponent, SideBarComponent],
  templateUrl: './home-org.component.html',
  styleUrls: ['./home-org.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeOrgComponent implements OnDestroy {

  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {
    console.log('inicializando home')
  }
  ngOnDestroy(): void {
    console.log('Method not implemented.');
  }


  ngOnInit(): void {
  }

  async isLoggedIn() {
    this.isAuthenticated = await this.authService.checkAuthentication();
  }


}
