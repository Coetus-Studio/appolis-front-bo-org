import { Component, NgModule, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../../interfaces/category.interface';
import { CategoriesService } from '../../services/categories.service';
import { DepartmentFormModel } from '../../interfaces/department.interface';
import { DepartmentsService } from '../../services/department.service';
import { AuthService } from '../../../../auth/auth.service';

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
  isUpdate: boolean = false;
  orgId: any;

  successMessage: string | null = null;
  successUpdateMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoriesService,
    private departmentService: DepartmentsService,
    private authService: AuthService,

  ) {
    this.departmentForm = this.fb.group({
      categories: this.fb.array([]) // Aquí estarán las categorías seleccionadas
    });


    this.authService.organizationId$.subscribe((orgId) => {
      this.orgId = orgId;
    })

    this.authService.getOrgId();

  }

  ngOnInit(): void {
    this.departmentForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      // category: [[], [Validators.required]], // arreglo de IDs
      categories: this.fb.array([]),
      responsible_organization: new FormControl(''),
      user_name: ['', [Validators.required]],
      user_email: ['', [Validators.required, Validators.email]],
      user_phone: [''],
      user_rut: [''],
      user_password: ['', [Validators.required, Validators.minLength(6)]] // ver bien regla de password
    });
    this.getAllCategories();
  }

  onSubmit() {
    console.log('pasando por aqui.....')
    if (this.isUpdate) {
      console.log('update')
      this.updateOpportunity();
    } else {
      console.log('created')
      this.createDepartment();
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


  async createDepartment() {
    console.log('creando departamento', this.departmentForm.value )
    console.log('orgId', this.orgId)

    if (this.departmentForm.valid) {
      const departmentData = this.departmentForm.getRawValue();

      const department: DepartmentFormModel = {
        _id: departmentData._id,
        name: departmentData.name,
        description: departmentData.description,
        category: departmentData.category,
        responsible_organization: this.orgId,
        user: departmentData.user,
        created_by: departmentData.created_by
      }

      console.log('departmentData: ', department)

      this.departmentService.createEvent(department).subscribe(res => {
        console.log('Event created successfully', res);
      })
      setTimeout(() => {
        this.successMessage = 'Evento creado con éxito.';
        this.errorMessage = null;
        this.departmentForm.reset(); // Limpia el formulario
      }, 1000);
    } else {
      console.log('El formulario no es válido');

    }


  }

  async updateOpportunity() {
    console.log('Por implementar.')
  }


}
