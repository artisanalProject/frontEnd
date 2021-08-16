import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class BlogService{
baseUrl="/api";

    constructor(private http:HttpClient) { }


getArticles(){
  return this.http.get(this.baseUrl+"/article/getArticles");
  }
  getArticleById(id){
    return this.http.get(this.baseUrl+"/article/getArticlesById/"+id);
    }
  addHit(id){
    return this.http.get(this.baseUrl+"/article/addHit/"+id);
    }

  addComment(idArticle, comment){
   return this.http.put(this.baseUrl+"/article/addComment/"+idArticle, comment);
  }
}