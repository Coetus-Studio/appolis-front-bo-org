import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../../../auth/auth.service";
import { filter, Observable, switchMap } from "rxjs";
import { Requirements } from "../interfaces/requirement.interface";

@Injectable({
  providedIn: 'root'
})
export class RequirementsService {

  private readonly apiUrl: string = 'http://localhost:3000/v1/requirements';


  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }



  getAllRequirements(): Observable<Requirements[]> {

    console.log('getAllRequirements service');
    return this.authService.getToken().pipe(
      filter(token => !!token),
      switchMap(token => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}`})
        return this.http.get<any[]>(`${this.apiUrl}`, { headers })
      })
    )
  }

  getRequirementById(id: string): Observable<Requirements> {
    console.log('getRequirementById service');
    return this.authService.getToken().pipe(
      filter(token =>!!token),
      switchMap(token => {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}`})
        return this.http.get<Requirements>(`${this.apiUrl}/${id}`, { headers })
      })
    )
  }
}
