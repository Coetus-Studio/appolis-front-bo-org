import { Component, NgModule, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../../interfaces/category.interface';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'department-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './department-form.component.html',
  styleUrl: './department-form.component.css'
})
export class DepartmentFormComponent implements OnInit {

  departmentForm!: FormGroup;
  categories: Category[] = [];


  categoryOptions: { label: string, value: string }[] = []


  constructor(
    private fb: FormBuilder,
    private categoryService: CategoriesService
  ) {
    this.departmentForm = this.fb.group({
      categories: this.fb.array([]) // Aquí estarán las categorías seleccionadas
    });

  }

  ngOnInit(): void {
    this.departmentForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      // category: [[], [Validators.required]], // arreglo de IDs
      categories: this.fb.array([]),
      responsible_organization: ['', [Validators.required]],
      user_name: ['', [Validators.required]],
      user_email: ['', [Validators.required, Validators.email]],
      user_phone: [''],
      user_rut: [''],
      user_password: ['', [Validators.required, Validators.minLength(6)]] // ver bien regla de password
    });
    this.getAllCategories();
  }

  onSubmit() {
    if (this.departmentForm.valid) {
      console.log('Formulario enviado:', this.departmentForm.value);
      // Aquí podés emitir, guardar o enviar a una API
    } else {
      this.departmentForm.markAllAsTouched();
    }
  }

  async getAllCategories() {
    this.categoryService.listCategories().subscribe({
      next: (categories) => {
        console.log('categories', categories);
        this.categoryOptions = categories
          .filter(category => !!category.name)
          .map(category => ({
            label: category.name!,
            value: category._id
          }))

        this.addCategoryCheckboxes();
      },
      error: (error) => {
        console.error('Error fetching categories: ', error)
      }
    })
  }

  get categoriesFormArray() {
    return this.departmentForm.get('categories') as FormArray;
  }

  private addCategoryCheckboxes() {
    this.categoryOptions.forEach(() => this.categoriesFormArray.push(new FormControl(false)));
  }

}
