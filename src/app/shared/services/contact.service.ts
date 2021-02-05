import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseUrl="/api";
  constructor(private http: HttpClient) { }
  public addContact(contact): Observable<Contact[]> {
    return this.http.post<Contact[]>(this.baseUrl+"/contact/addContact",contact)
  }
  
}
