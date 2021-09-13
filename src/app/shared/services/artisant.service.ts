import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Artisant } from "src/app/models/artisant";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class ArtisantService {
  baseUrl = environment.base_url;
  constructor(private http: HttpClient) {}
  public getArtisant(): Observable<Artisant[]> {
    return this.http.get<Artisant[]>(this.baseUrl + "/artisant/getArtisant");
  }
  public deleteAccount(id) {
    return this.http.delete(this.baseUrl + "/artisant/deleteAccount/" + id);
  }
  public nbArtisansPerMonth() {
    return this.http.get(this.baseUrl + "/artisant/nbArtisansPerMonth");
  }
}
