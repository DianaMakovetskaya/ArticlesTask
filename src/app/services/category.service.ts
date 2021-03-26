import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Category[]>{
    return this.httpClient.get<Category[]>(`${this.baseUrl}/api/categories`);

  }
  getCategoryById(id): Observable<Category>{
    return this.httpClient.get<Category>(`${this.baseUrl}/api/categories/${id}`);

  }
}
