import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpportunitiesService } from '../../services/opportunities.service';
import { Opportunity } from '../../interfaces/opportunities.interface';

@Component({
  selector: 'app-opportunity-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './opportunity-detail.component.html',
  styleUrl: './opportunity-detail.component.css'
})
export default class OpportunityDetailComponent implements OnInit {

  opportunity!: Opportunity;

  constructor (
    private route: ActivatedRoute, // proporciona informacion sobre la ruta activa, obtiene el id entre otras
    private opportunityService: OpportunitiesService
  ) {

  }

  ngOnInit(): void {
    this.getOpportunityById();
  }

  getOpportunityById() {
    const eventId = this.route.snapshot.paramMap.get('id');

    if (eventId) {
      this.opportunityService.getOpportunityById(eventId).subscribe(opportunity => {
        this.opportunity = opportunity;
        console.log('opportunity by id:', this.opportunity)
      })
    }

  }

}
