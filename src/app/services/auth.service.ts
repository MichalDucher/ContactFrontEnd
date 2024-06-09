import { Injectable } from '@angular/core';
import  { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { LOGIN_URL } from '../data/api';

@Injectable({
  providedIn: 'root'
})

//Serwis odpowiedialny za autentykację
export class AuthService {

  //Konstruktor przyjmujący httpCLient(do wystosowyania zapytań do API) oraz Router do przekierowań
  constructor(private http: HttpClient, private router: Router) { }

  
  //Funkcja logująca, która zwraca JwtToken(zwracany przez API) w przypadku udanej autentykacji 
  //I zapisuje go w 'localStorage', na podstawie któego definiowana jest sesja użytkownika i jej ważność
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(LOGIN_URL, { username, password }).pipe(
      map(response => {
        const token = response.token;
        if (token) {
          localStorage.setItem('jwtToken', token);
        }
        return token;
      })
    );
  }

  //Funkcja wylogowująca, która usuwa token z 'localStorage' i przekierowuje na stronę główną
  logout(): void {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/']); 
  }

  //Funkcja sprawdzająca czy użytkownik jest zalogowany
  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwtToken');
    return !!token;
  }
}
