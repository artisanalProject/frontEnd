import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { Contact } from "src/app/models/contact";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class ContactService {
  public notifEmails = new BehaviorSubject(0);
  nbNotif;
  baseUrl = environment.base_url;
  constructor(private http: HttpClient) {}

  public addContact(contact): Observable<Contact[]> {
    return this.http.post<Contact[]>(
      this.baseUrl + "/contact/addContact",
      contact
    );
  }
  public getContact(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.baseUrl + "/contact/getContact");
  }
  public getContactById(id): Observable<Contact> {
    return this.http.get<Contact>(
      this.baseUrl + "/contact/getContactById/" + id
    );
  }

  public changeStatus(id) {
    return this.http.get(this.baseUrl + "/contact/changeStatus/" + id);
  }

  public nbNotifEmails() {
    this.getContact().subscribe(
      (res) => {
        this.nbNotif = JSON.parse(JSON.stringify(res)).filter(
          (x) => x.status == "unreaded"
        ).length;
      },
      (err) => {},
      () => {
        this.notifEmails.next(this.nbNotif);
      }
    );
  }

  public nbContacts() {
    return this.http.get(this.baseUrl + "/contact/nbContacts");
  }
}
