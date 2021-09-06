import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { artisanService } from 'src/app/services/artisanService';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user:any;
  show=true
  btnName="Enable Form";
  role=""
  constructor(private artisanService:artisanService,private _snackBar: MatSnackBar, private router : Router) { }

  ngOnInit() { 
    if(JSON.parse(localStorage.getItem('connectedUser'))){
      if(JSON.parse(localStorage.getItem('connectedUser')).artisan){
        this.role="artisan"
        this.user=JSON.parse(localStorage.getItem('connectedUser')).artisan
      }else if(JSON.parse(localStorage.getItem('connectedUser')).admin){
        this.role="admin"
        this.user=JSON.parse(localStorage.getItem('connectedUser')).admin
        console.log(this.user);
         
      }
    }
  }

  updateProfile(name,email,address,phoneNumber,storeName){
    if(this.btnName=='Enable Form'){
      this.btnName='Update Profile'
      this.show=false
    }else {
      if(this.role=="artisan"){
        this.user.name=name.value
        this.user.email=email.value
        this.user.address=address.value
        this.user.phoneNumber=phoneNumber.value
        this.user.storeName=storeName.value
      }
      else {
        this.user.name=name.value
        this.user.email=email.value
        // this.user.address=address.value
        this.user.phoneNumber=phoneNumber.value
        // this.user.storeName=storeName.value
      }
     
      console.log(this.user);
      let body={
        role:this.role,
        user:this.user
      }
      
      this.artisanService.updateProfile(body).subscribe(res=>{
        if(JSON.parse(localStorage.getItem('connectedUser')).artisan){
          let connectedUser=JSON.parse(localStorage.getItem('connectedUser'))      
          connectedUser.artisan=res
          localStorage.setItem('connectedUser',JSON.stringify(connectedUser))
          
        }else{
          let connectedUser=JSON.parse(localStorage.getItem('connectedUser'))
          connectedUser.admin=res
          localStorage.setItem('connectedUser',JSON.stringify(connectedUser))
        }
        this.ngOnInit()
      },err=>{console.log(err);
      },()=>{
        this._snackBar.open('Profile Updated','ok',{
          duration: 10000,
          verticalPosition: 'top',  
          horizontalPosition: 'center',
        });

      
      }
      )   
      this.btnName='Enable Form'
      this.show=true
    }

  }

  changePassword(newPwd){
    this.user.password=newPwd.value
    let body={
      role:this.role,
      user:this.user
    }
    this.artisanService.changePassword(body).subscribe(res=>{
      if(JSON.parse(localStorage.getItem('connectedUser')).artisan){
        let connectedUser=JSON.parse(localStorage.getItem('connectedUser'))      
        connectedUser.artisan=res
        localStorage.setItem('connectedUser',JSON.stringify(connectedUser))
        
      }else{
        let connectedUser=JSON.parse(localStorage.getItem('connectedUser'))
        connectedUser.admin=res
        localStorage.setItem('connectedUser',JSON.stringify(connectedUser))
      }
      this.ngOnInit()
    },err=>{console.log(err);
    },
    ()=>{
      this._snackBar.open('Password Updated','ok',{
        duration: 10000,
        verticalPosition: 'top',  
        horizontalPosition: 'center',
      });
      newPwd.value=""
    })
  }
  deleteAccount(){
    console.log(this.user._id);
    
    this.artisanService.deleteAccount(this.user._id).subscribe(res=>{
    },err=>{console.log(err);
    },
    ()=>{
      this.router.navigateByUrl("/auth/login")
    }) 
  }
  test(){
    
  }
}
