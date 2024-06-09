import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONTACTS_URL } from '../data/api';
import { Contact } from '../interfaces/Contact';

@Injectable({
  providedIn: 'root'
})

//Klasa reprezentująca serwis do zarządzania kontaktami
export class ContactService {

  //Konstruktor przyjmujący HttpClient potrzebny do komunikacji z API
  constructor(private http: HttpClient) { }

  //Zwraca listę kontaktów
  getContacts(): Observable<Contact[]>{
    return this.http.get<any[]>(CONTACTS_URL);
  }

  //Zwraca kontakt o konkretnym id
  getContact(id: number): Observable<Contact>{
    return this.http.get<any>(`${CONTACTS_URL}/${id}`);
  }

  //Dodaje nowy kontakt
  //Dodaje do nagłówka Bearer token potrzebny do autoryzacji po stronie API
  addContact(contact: Contact): Observable<any>{
    const token = localStorage.getItem("jwtToken");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(CONTACTS_URL, contact, { headers });
  }

  //Aktualizuje istniejący kontakt o danym id
  //Dodaje do nagłówka Bearer token potrzebny do autoryzacji po stronie API
  updateContact(contact: Contact, id: number): Observable<any>{
    const token = localStorage.getItem("jwtToken");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${CONTACTS_URL}/${id}`, contact, { headers });
  }

  //Usuwa istniejący kontakt o danym id
  //Dodaje do nagłówka Bearer token potrzebny do autoryzacji po stronie API
  deleteContact(id: number): Observable<any>{
    const token = localStorage.getItem("jwtToken");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${CONTACTS_URL}/${id}`, { headers });
  }
}
