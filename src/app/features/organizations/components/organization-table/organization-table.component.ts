import { Component, Input, signal, Signal } from '@angular/core';
import { Organization } from '../../interfaces/organization.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'organization-table',
  standalone: true,
  imports: [ CommonModule, OrganizationTableComponent ],
  templateUrl: './organization-table.component.html',
  styleUrl: './organization-table.component.css'
})
export class OrganizationTableComponent {

  public organization: Signal<Organization[]> = signal([
    {
      id: 1,
      name: 'Coetus Studio',
      address: '123 Main St',
      phone: '555-555-5555'
    },
    {
      id: 2,
      name: 'Another Organization',
      address: '456 Elm St',
      phone: '666-666-6666'
    },
    {
      id: 3,
      name: 'Yet Another Organization',
      address: '789 Oak St',
      phone: '777-777-7777'
    }
  ]);

  // public organization = signal<Organization[]>([
  //   {
  //     id: 1,
  //     name: 'Coetus Studio',
  //     address: '123 Main St',
  //     phone: '555-555-5555'
  //   }
  // ])


  constructor() {}

  listOrganizations() {
    console.log('listOrganizations', this.organization.name);

    // const name = this.organization;

    // console.log(name);




  }

}
