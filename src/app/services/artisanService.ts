import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class artisanService{
baseUrl="/api";

    constructor(private http:HttpClient) { }

 usersUrl:string="/api/claim";
register(body){
return this.http.post(this.baseUrl+"/artisant/addArtisant",body);
}

login(body){
  return this.http.post(this.baseUrl+"/artisant/loginArtisant",body);
  }

}