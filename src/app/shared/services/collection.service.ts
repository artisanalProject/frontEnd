import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Collections } from 'src/app/models/collections';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  baseUrl="/api";
  constructor(private http: HttpClient) { }
  public getCollection(): Observable<Collections[]> {
    return this.http.get<Collections[]>(this.baseUrl+"/collection/getCollections")
  }
}
