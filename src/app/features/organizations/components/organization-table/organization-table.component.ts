import { Component, Input } from '@angular/core';
import { Organization } from '../../interfaces/organization.interface';

@Component({
  selector: 'organization-table',
  standalone: true,
  imports: [],
  templateUrl: './organization-table.component.html',
  styleUrl: './organization-table.component.css'
})
export class OrganizationTableComponent {

  @Input()
  public organizations: Organization[] = [];

}
