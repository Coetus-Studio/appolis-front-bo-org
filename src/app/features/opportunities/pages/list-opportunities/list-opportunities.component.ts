import { Component } from '@angular/core';
import { OpportunitiesService } from '../../services/opportunities.service';
import { Opportunity } from '../../interfaces/opportunities.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-opportunities',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './list-opportunities.component.html',
  styleUrl: './list-opportunities.component.css'
})
export default class ListOpportunitiesComponent {

  constructor(
    private opportunityService: OpportunitiesService,
  ) {

  }

  opportunities: Opportunity[] = [];

  async getAllOpportunities() {
    this.opportunityService.listOpportunities().subscribe({
      next: (opportunities) => {
        console.log('opportunities' + JSON.stringify(opportunities));
        this.opportunities = opportunities;
      },
      error: (error) => {
        console.error('Error fetching opportunities:', error);
      }
    })
  }

}
