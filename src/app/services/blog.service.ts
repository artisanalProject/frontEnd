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
  addArticle(article){
      return this.http.post(this.baseUrl+"/article/addArticle/", article);
      }

      
 updateArticle(article,id){
    return this.http.put(this.baseUrl+"/article/updateArticle/"+id, article);
    }



  addHit(id){
    return this.http.get(this.baseUrl+"/article/addHit/"+id);
    }

  addComment(idArticle, comment){
   return this.http.put(this.baseUrl+"/article/addComment/"+idArticle, comment);
  }
  public addToFavoris(id){
    return this.http.get(this.baseUrl +"/article/addToFavoris/"+id)
   }
   public removeFromFavoris(id){
    return this.http.get(this.baseUrl +"/article/removeFromFavoris/"+id)
   }
   public deleteArticle(id){
    return this.http.delete(this.baseUrl +"/article/deleteArticle/"+id)
   }
}