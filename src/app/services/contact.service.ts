import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONTACTS_URL } from '../data/api';
import { Contact } from '../interfaces/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]>{
    return this.http.get<any[]>(CONTACTS_URL);
  }

  getContact(id: number): Observable<Contact>{
    return this.http.get<any>(`${CONTACTS_URL}/${id}`);
  }

  addContact(contact: Contact): Observable<any>{
    const token = localStorage.getItem("jwtToken");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(CONTACTS_URL, contact, { headers });
  }

  updateContact(contact: Contact, id: number): Observable<any>{
    const token = localStorage.getItem("jwtToken");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${CONTACTS_URL}/${id}`, contact, { headers });
  }

  deleteContact(id: number): Observable<any>{
    const token = localStorage.getItem("jwtToken");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${CONTACTS_URL}/${id}`, { headers });
  }
}
