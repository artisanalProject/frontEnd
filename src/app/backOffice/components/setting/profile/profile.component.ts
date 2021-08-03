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
  btnName="Enable Form"
  constructor(private artisanService:artisanService,private _snackBar: MatSnackBar, private router : Router) { }

  ngOnInit() { 
    if(JSON.parse(localStorage.getItem('connectedUser'))){
      if(JSON.parse(localStorage.getItem('connectedUser')).artisan){
        this.user=JSON.parse(localStorage.getItem('connectedUser')).artisan
      }else if(JSON.parse(localStorage.getItem('connectedUser')).artisan){
        this.user=JSON.parse(localStorage.getItem('connectedUser')).admin
      }
    }
  }

  updateProfile(name,email,address,phoneNumber,storeName){
    if(this.btnName=='Enable Form'){
      this.btnName='Update Profile'
      this.show=false
    }else {
      this.user.name=name.value
      this.user.email=email.value
      this.user.address=address.value
      this.user.phoneNumber=phoneNumber.value
      this.user.storeName=storeName.value
      console.log(this.user);
      
      this.artisanService.updateProfile(this.user).subscribe(res=>{console.log(res);
      },err=>{console.log(err);
      },()=>{
        this._snackBar.open('Profile Updated','ok',{
          duration: 10000,
          verticalPosition: 'top',  
          horizontalPosition: 'center',
        });

        if(JSON.parse(localStorage.getItem('connectedUser')).artisan){
          let connectedUser=JSON.parse(localStorage.getItem('connectedUser'))      
          connectedUser.artisan=this.user
          localStorage.setItem('connectedUser',JSON.stringify(connectedUser))
          
        }else{
          let connectedUser=JSON.parse(localStorage.getItem('connectedUser'))
          connectedUser.admin=this.user
          localStorage.setItem('connectedUser',JSON.stringify(connectedUser))
        }
        this.ngOnInit()
      }
      )   
      this.btnName='Enable Form'
      this.show=true
    }

  }

  changePassword(newPwd){
    this.user.password=newPwd
    this.artisanService.changePassword(this.user).subscribe(res=>{
    },err=>{console.log(err);
    },
    ()=>{
      this._snackBar.open('Password Updated','ok',{
        duration: 10000,
        verticalPosition: 'top',  
        horizontalPosition: 'center',
      });
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
    console.log('e');
    
  }
}
