import { Component, OnInit } from '@angular/core';
import { OpportunitiesService } from '../../services/opportunities.service';
import { Opportunity } from '../../interfaces/opportunities.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-opportunities',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './list-opportunities.component.html',
  styleUrl: './list-opportunities.component.css'
})
export default class ListOpportunitiesComponent implements OnInit {

  opportunities: Opportunity[] = [];

  constructor(
    private opportunityService: OpportunitiesService,
  ) {

  }
  ngOnInit(): void {
    this.getAllOpportunities();
  }


  async getAllOpportunities() {
    this.opportunityService.listOpportunities().subscribe({
      next: (opportunities) => {
        console.log('opportunities', opportunities);
        this.opportunities = opportunities;
      },
      error: (error) => {
        console.error('Error fetching opportunities:', error);
      }
    })
  }

}
