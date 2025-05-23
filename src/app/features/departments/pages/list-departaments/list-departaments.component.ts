import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DepartmentsService } from '../../services/department.service';
import { DepartmentFormModel } from '../../interfaces/department.interface';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-list-departaments',
  standalone: true,
  imports: [ RouterLink, CommonModule ],
  templateUrl: './list-departaments.component.html',
  styleUrl: './list-departaments.component.css'
})
export default class ListDepartamentsComponent implements OnInit {

  departments: DepartmentFormModel[] = [];

  constructor(
    private departmentService: DepartmentsService,
  ) {}
  ngOnInit(): void {

    this.getAllDepartments();


  }

  async getAllDepartments() {
    this.departmentService.listDepartments().subscribe({
      next: (departments) => {
        console.log('deparments', departments);
        this.departments = departments;
      },
      error: (error) => {
        console.error('Error fetching departments:', error);
      }
    })
  }


}
