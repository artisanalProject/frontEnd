import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl="/api";
  constructor(private http: HttpClient) { }
  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl+"/category/getCategories")
  }

  public addCategory(category){
    return this.http.post(this.baseUrl+"/category/addCategory",category)
  }
  public deleteCategory(id){
    return this.http.delete(this.baseUrl+"/category/deletCategory/"+id)
  }
}
