import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Artisant } from "src/app/models/artisant";

@Injectable({
  providedIn: "root",
})
export class ArtisantService {
  baseUrl = "/api";
  constructor(private http: HttpClient) {}
  public getArtisant(): Observable<Artisant[]> {
    return this.http.get<Artisant[]>(this.baseUrl + "/artisant/getArtisant");
  }
  public deleteAccount(id) {
    return this.http.delete(this.baseUrl + "/artisant/deleteAccount/" + id);
  }
}
