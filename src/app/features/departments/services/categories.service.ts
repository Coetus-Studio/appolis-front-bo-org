import { Injectable } from "@angular/core";
import { AuthService } from "../../../auth/auth.service";
import { StorageService } from "../../../storage.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "../interfaces/category.interface";


@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  private readonly apiUrl: string = 'http://localhost:3000/v1/categories';

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private authService: AuthService
  ) { }

  listCategories(): Observable<Category[]> {

    return this.http.get<Category[]>(`${this.apiUrl}`);
  }

}
