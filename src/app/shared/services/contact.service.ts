import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Contact } from 'src/app/models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public notifEmails = new BehaviorSubject(0);
  nbNotif;
  baseUrl="/api";
  constructor(private http: HttpClient) { }

  public addContact(contact): Observable<Contact[]> {
    return this.http.post<Contact[]>(this.baseUrl+"/contact/addContact",contact)
  }
  public getContact(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.baseUrl+"/contact/getContact")
  }

  public  nbNotifEmails() {
    return  this.getContact().subscribe(res=>{
        this.nbNotif=JSON.parse(JSON.stringify(res)).filter(x=>x.status=="unread").length
      },err=>{},()=>{
        this.notifEmails.next(this.nbNotif)
      })
     }
  
}
