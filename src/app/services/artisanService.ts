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
nbNotif
public notifRequests = new BehaviorSubject(0);

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
public RequestProduct(product){
  return this.http.post(this.baseUrl +"/artisant/RequestProduct", product)
 }

 public nb(){
   this.NotActivatedAccounts().subscribe(res=>{this.nbNotif=JSON.parse(JSON.stringify(res)).length},err=>{},()=>{
    this.notifRequests.next(this.nbNotif)
   })
 }

 public updateProfile(body){
  return this.http.put(this.baseUrl +"/artisant/updateProfile", body)
}
public changePassword(body){
  return this.http.put(this.baseUrl +"/artisant/changePassword", body)
}

public deleteAccount(id){
  return this.http.put(this.baseUrl +"/artisant/deleteAccount", id)
}

}