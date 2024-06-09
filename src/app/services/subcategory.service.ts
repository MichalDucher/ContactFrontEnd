import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SUBCATEGORIES_URL } from '../data/api';
import { Subcategory } from '../interfaces/Subcategory';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private  http: HttpClient) { }

  getCategories(): Observable<Subcategory[]>{
    return this.http.get<Subcategory[]>(SUBCATEGORIES_URL);
  }

  getCategory(id: number): Observable<Subcategory>{
    return this.http.get<Subcategory>(SUBCATEGORIES_URL);
  }
}
