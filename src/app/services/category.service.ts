import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CATEGORIES_URL } from '../data/api';
import { Category } from '../interfaces/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private  http: HttpClient) { }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(CATEGORIES_URL);
  }

  getCategory(id: number): Observable<Category>{
    return this.http.get<Category>(CATEGORIES_URL);
  }
}
