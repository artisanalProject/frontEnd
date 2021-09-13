import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class adminService {
  baseUrl = environment.base_url;

  constructor(private http: HttpClient) {}

  login(body) {
    return this.http.post(this.baseUrl + "/admin/loginAdmin", body);
  }

  forgotPwd(email) {
    return this.http.get(this.baseUrl + "/admin/forgotPwd?emailTo=" + email);
  }

  loggedIn() {
    return !!localStorage.getItem("connectedUser");
  }
}
