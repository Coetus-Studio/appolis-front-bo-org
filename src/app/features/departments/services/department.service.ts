import { Injectable } from "@angular/core";
import { filter, Observable, switchMap } from "rxjs";
import { DepartmentFormModel } from "../interfaces/department.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../../../auth/auth.service";
import { StorageService } from "../../../storage.service";
import { Opportunity } from "../../opportunities/interfaces/opportunities.interface";


@Injectable({
  providedIn: 'root'
})

export class DepartmentsService {

  private authToken: string | undefined | null = '';

  private readonly apiUrl: string = 'http://localhost:3000/v1/departments';


  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private authService: AuthService
  ) { }

  listDepartments(): Observable<DepartmentFormModel[]> {

    return this.authService.getToken().pipe(
      filter(token => !!token),
      switchMap(token => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` })
        return this.http.get<DepartmentFormModel[]>(`${this.apiUrl}`, { headers })

      })
    )

  }

  createEvent(body: DepartmentFormModel): Observable<DepartmentFormModel> {
    console.log('body depto', body);

    return this.authService.getToken().pipe(
      filter(token => !!token), // Espera a que el token esté disponible
      switchMap(token => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.post<DepartmentFormModel>(this.apiUrl, body, { headers });
      })
    )
  }

}
