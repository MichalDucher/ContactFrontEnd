import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CATEGORIES_URL } from '../data/api';
import { Category } from '../interfaces/Category';

@Injectable({
  providedIn: 'root'
})

//Klasa reprezentująca serwis do obsługi kategorii
//Zawiera dwie funkcje GET, bo tylko one są potrzebne do funkcjonowania aplikacji
export class CategoryService {

  //Konstruktor przyjmujący HttpClient potrzebny do wysyłania zapytań do API
  constructor(private  http: HttpClient) { }

  //Zwraca listę kategorii
  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(CATEGORIES_URL);
  }

  //Zwraca kategorię o danym id
  getCategory(id: number): Observable<Category>{
    return this.http.get<Category>(CATEGORIES_URL);
  }
}
