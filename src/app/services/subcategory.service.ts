import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SUBCATEGORIES_URL } from '../data/api';
import { Subcategory } from '../interfaces/Subcategory';

@Injectable({
  providedIn: 'root'
})

//Klasa reprezentująca serwis podkategorii
//Zawiera dwie metody GET potrzebne do poprawnego funkcjonowania aplikacji
export class SubcategoryService {

  //Konstruktor przyjmujący HttpClient, potrzebny do komunikacji z API
  constructor(private  http: HttpClient) { }

  //Zwraca listę podkategorii
  getCategories(): Observable<Subcategory[]>{
    return this.http.get<Subcategory[]>(SUBCATEGORIES_URL);
  }

  //Zwraca podkategorię o konkretnym id
  getCategory(id: number): Observable<Subcategory>{
    return this.http.get<Subcategory>(SUBCATEGORIES_URL);
  }
}
