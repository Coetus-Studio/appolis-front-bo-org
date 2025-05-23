import { Component } from '@angular/core';
import CreateDepartmentComponent from "../create-department/create-department.component";

@Component({
  selector: 'app-home-department',
  standalone: true,
  imports: [CreateDepartmentComponent],
  templateUrl: './home-department.component.html',
  styleUrl: './home-department.component.css'
})
export default class HomeDepartmentComponent {

}
