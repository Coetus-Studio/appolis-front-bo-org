import { Component, OnInit } from '@angular/core';
import { OpportunityFormComponent } from '../../components/opportunity-form/opportunity-form.component';
import { OpportunityFormService } from '../../services/opportunity-form.service';

@Component({
  selector: 'app-create-opportunity',
  standalone: true,
  imports: [OpportunityFormComponent],
  templateUrl: './create-opportunity.component.html',
  styleUrl: './create-opportunity.component.css'
})
export default class CreateOpportunityComponent implements OnInit {

  opportunityForm: any;

  constructor (
    private opportFormService: OpportunityFormService
  ) {}

  ngOnInit(): void {
    console.log('implement CreateOpportunityComponent');
    this.opportunityForm = this.opportFormService.getForm();
    console.log('opportunity form: ', this.opportunityForm)
  }



}
