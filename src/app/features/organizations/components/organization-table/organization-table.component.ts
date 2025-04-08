import { Component, Input, signal, Signal } from '@angular/core';
import { Organization } from '../../interfaces/organization.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'organization-table',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './organization-table.component.html',
  styleUrl: './organization-table.component.css'
})
export class OrganizationTableComponent {

  public organization: Signal<Organization[]> = signal([]);

  constructor() {}

  listOrganizations() {
    console.log('listOrganizations', this.organization.name);
    // const name = this.organization;
    // console.log(name);
  }

}
