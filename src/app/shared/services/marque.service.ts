import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import {Marque} from 'src/app/models/marque'
@Injectable({
  providedIn: 'root'
})
export class MarqueService {
  baseUrl="/api";
  constructor(private http: HttpClient) { }
  public getMarqueByCategoryId(id): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl+"/marque/getMarquesById/"+id)
  }
}
