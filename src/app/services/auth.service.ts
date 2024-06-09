import { Injectable } from '@angular/core';
import  { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { LOGIN_URL } from '../data/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  
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

  logout(): void {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/']); 
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwtToken');
    return !!token;
  }
}
