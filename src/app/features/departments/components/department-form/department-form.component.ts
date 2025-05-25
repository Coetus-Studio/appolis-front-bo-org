import { Component, NgModule, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../../interfaces/category.interface';
import { CategoriesService } from '../../services/categories.service';
import { DepartmentFormModel } from '../../interfaces/department.interface';
import { DepartmentsService } from '../../services/department.service';
import { AuthService } from '../../../../auth/auth.service';
import { User } from '../../../../shared/interfaces/user-session.interface';

@Component({
  selector: 'department-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './department-form.component.html',
  styleUrl: './department-form.component.css'
})
export class DepartmentFormComponent implements OnInit {

  departmentForm!: FormGroup;
  operatorForm!: FormGroup;
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
    this.initDepartmentForm();
    this.initOperatorForm();
    this.getAllCategories();
  }

  initDepartmentForm(): void {
    this.departmentForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      // categories: this.fb.array([]),
      categories: this.fb.array([]),
      responsible_organization: this.orgId,
      // users: this.fb.group({

      // })
    });
  }

  initOperatorForm() {
    this.operatorForm = this.fb.group({
      public_id: ['', Validators.required],
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required]
    })
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

  get categoriesFormArray(): FormArray<FormControl<boolean>> {
    return this.departmentForm.get('categories') as FormArray<FormControl<boolean>>;
  }

  private addCategoryCheckboxes() {
    this.categoryOptions.forEach(() =>
      this.categoriesFormArray.push(new FormControl(false, { nonNullable: true }))
    );
  }

  get userForm(): FormGroup {
    return this.departmentForm.get('user') as FormGroup;
  }

  async createDepartment() {
    if (this.departmentForm.valid) {

      const departmentData = this.departmentForm.getRawValue();
      console.log('departmentData', departmentData)

      const userData = this.operatorForm.getRawValue();
      console.log('userData: ', userData);

      const selectedCategories = this.categoryOptions
        .filter((_, i) => departmentData.categories[i])
        .map(opt => opt.value);

      const department: DepartmentFormModel = {
        name: departmentData.name,
        description: departmentData.description,
        category: selectedCategories,
        responsible_organization: this.orgId,
        // user: userData.user,
        created_by: 'null' // agrega el valor real si aplica
      };

      console.log('department: ', department)

      const user: User = {
        public_id: userData.public_id,
        full_name: userData.full_name,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
        rolesByOrganization: userData.rolesByOrganization
      }

      console.log('user', user)

      this.departmentService.createDepartment(department).subscribe({
        next: (res) => {
          console.log('Departamento creado', res);
          this.successMessage = 'Departamento creado con éxito.';
          this.errorMessage = null;
          this.departmentForm.reset();
        },
        error: (err) => {
          console.error('Error al crear', err);
          this.errorMessage = 'Error al crear el departamento.';
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }

  async updateOpportunity() {
    console.log('Por implementar.')
  }


}
