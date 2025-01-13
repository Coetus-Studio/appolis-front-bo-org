import { Component, Signal, signal } from '@angular/core';
import { Organization } from '../../interfaces/organization.interface';
import { OrganizationTableComponent } from '../../components/organization-table/organization-table.component';

@Component({
  selector: 'app-list-organization',
  standalone: true,
  imports: [ OrganizationTableComponent ],
  templateUrl: './list-organization.component.html',
  styleUrl: './list-organization.component.css'
})
export default class ListOrganizationComponent {




  constructor() {
  }



}
