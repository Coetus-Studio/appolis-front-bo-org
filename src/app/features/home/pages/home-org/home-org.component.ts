import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';
import { NavBarComponent } from '../../../../shared/nav-bar/nav-bar.component';
import { SideBarComponent } from '../../../../shared/side-bar/side-bar.component';
import { EventService } from '../../../events/services/event.service';
import { RequirementsService } from '../../../requirements/services/requirements.service';
import { UsersService } from '../../../users/services/users.service';
import { NavBarService } from '../../../../shared/services/nav-bar.service';
import { SkeletonComponent } from "../../components/skeleton/skeleton.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-org',
  standalone: true,
  imports: [SkeletonComponent, CommonModule],
  templateUrl: './home-org.component.html',
  styleUrls: ['./home-org.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeOrgComponent implements OnDestroy {

  isAuthenticated: boolean = false;

  totalEventsInProgress: number = 0;

  requirementsOrg: number = 0;

  subscribedUser: number = 0;

  registeredOrgId: string | null | undefined = '';

  isLoading = true;


  constructor(
    private authService: AuthService,
    private eventService: EventService,
    private requirementService: RequirementsService,
    private usersService: UsersService,
    public navBarService: NavBarService
  ) {
    console.log('inicializando home')
  }
  ngOnDestroy(): void {
    console.log('Method not implemented.');
  }


  ngOnInit(): void {
    this.totalEvents();
    this.totalRequirements();
    this.subscribedUsers();
    this.isLoading = false;
  }

  async isLoggedIn() {
    this.isAuthenticated = await this.authService.checkAuthentication();
  }

  async totalEvents() {
    console.log('cantidad de eventos abiertos');

    const orgId = this.registeredOrgId;

    if (orgId !== null && orgId !== undefined) {
      this.eventService.getAllEvents(orgId).subscribe({
        next: (eventOrg) => {
          this.totalEventsInProgress = eventOrg.length;
          // this.filteredEvents = eventOrg;
          console.log(this.totalEventsInProgress);
        },
        error: (error) => {
          console.error('Error fetching events:', error);
        }
      });
    }
  }

  async totalRequirements() {

    console.log('get all requirements');

    this.requirementService.getAllRequirements().subscribe({
      next: (requirements) => {
        // console.log('requirements' + JSON.stringify(requirements));
        console.log('requirements: ', requirements)
        this.requirementsOrg = requirements.length;
      },
      error: (error) => {
        console.error('Error fetching requirements', error);
      }
    })

  }

  async subscribedUsers() {
    console.log('cantidad usuarios registrados')
    // this.loading = true;
    this.usersService.getUsers().subscribe({
      next: (data) => {
        this.subscribedUser = data.length;
        // this.loading = false;
      },
      error: (err) => {
        console.error(err);
        // this.loading = false;
      }
    });

  }


}
