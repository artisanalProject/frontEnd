import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class artisanService{
baseUrl="/api";
connectedUser;
httpHeaders;
options;
    constructor(private http:HttpClient) { 
      if(JSON.parse(localStorage.getItem('connectedUser'))){
        this.connectedUser=JSON.parse(localStorage.getItem('connectedUser'));
        this.httpHeaders= new HttpHeaders({
            'Authorization':'Bearer '+this.connectedUser.token
        });
         this.options={headers:this.httpHeaders}
      }
   
    }

register(body){
return this.http.post(this.baseUrl+"/artisant/addArtisant",body);
}

login(body){
  return this.http.post(this.baseUrl+"/artisant/loginArtisant",body);
}
NotActivatedAccounts(){
  return this.http.get(this.baseUrl+"/artisant/NotActivatedAccounts",this.options);
}
activateAccount(idArtisant){
  return this.http.get(this.baseUrl+"/artisant/activateAccount/"+idArtisant,this.options);

}
}