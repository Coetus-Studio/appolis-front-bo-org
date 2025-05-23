import { Component } from '@angular/core';
import { DepartmentFormComponent } from "../../components/department-form/department-form.component";

@Component({
  selector: 'create-department',
  standalone: true,
  imports: [DepartmentFormComponent],
  templateUrl: './create-department.component.html',
  styleUrl: './create-department.component.css'
})
export default class CreateDepartmentComponent {

}
