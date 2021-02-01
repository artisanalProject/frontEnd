import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Artisant } from 'src/app/models/artisant';
import { artisanService } from 'src/app/services/artisanService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { adminService } from 'src/app/services/adminService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public registerForm: FormGroup;
  responseRegister;
  responseLogin;
  responseForgotPwd;

  constructor(private formBuilder: FormBuilder, private artisanService : artisanService,private _snackBar: MatSnackBar,private adminService : adminService,private router : Router) {
    this.createLoginForm();
    this.createRegisterForm();
  }

  owlcarousel = [
    {
      title: "Welcome to Multikart",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    },
    {
      title: "Welcome to Multikart",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    },
    {
      title: "Welcome to Multikart",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    }
  ]
  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true
  };

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required],
      checkAdmin:[false]
    })
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      name: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required],
      phoneNumber: ['',Validators.required],
      address:['',Validators.required],
      storeName: ['',Validators.required],
      typeOfWork: ['',Validators.required],
      codePostal: ['',Validators.required],
      cin: ['',Validators.required],
    })
  }


  ngOnInit() {
  }

  login(){
    if(this.loginForm.invalid){
      this._snackBar.open('Tous les champs sont obligatoires','ok',{
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }
    else if(!this.loginForm.controls.checkAdmin.value){
      this.artisanService.login(this.loginForm.value).subscribe(res=>{
      this.responseLogin=JSON.parse(JSON.stringify(res));
      },
      err=>{console.log(err);
      },()=>{
        if(this.responseLogin=="verify email or password"){
          this._snackBar.open('Vérifiez email ou mot de passe','ok',{
            duration: 10000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        }
        else if(this.responseLogin=="not activated"){
          this._snackBar.open("Votre compte n'est pas activé. Vous recevrez un mail d'activation le plutôt possible",'ok',{
            duration: 10000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        }
        else {
          localStorage.setItem('connectedUser',JSON.stringify(this.responseLogin))
          console.log("artisaaan "+this.responseLogin);
          this.router.navigateByUrl('/admin/dashboard/default');
        }
      })
    }
    else {
      console.log("xxx");
      
      this.adminService.login(this.loginForm.value).subscribe(res=>{this.responseLogin=JSON.parse(JSON.stringify(res))},
      err=>{},
      ()=>{
        console.log(this.responseLogin);
        
        if(this.responseLogin=="verify email or password"){
          this._snackBar.open('Vérifiez email ou mot de passe','ok',{
            duration: 10000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        }
        else{
          localStorage.setItem('connectedUser',JSON.stringify(this.responseLogin));
          this.router.navigateByUrl('/admin/dashboard/default');
          console.log("admiin "+this.responseLogin);
        }
      })
    }
  }
  register(){
    if(this.registerForm.invalid){
      this._snackBar.open('Tous les champs sont obligatoires','ok',{
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }
    else{
  this.artisanService.register(this.registerForm.value).subscribe(res=>{this.responseRegister=JSON.parse(JSON.stringify(res))},err=>{
    console.log(err);
    
  },()=>{
    if(this.responseRegister=="account already exist"){
      this._snackBar.open('Vous avez déjà un compte','ok',{
        duration: 10000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }else{
      this._snackBar.open('Vous êtes inscri avec succès, vous recevrez un email de confirmation le plutôt possible','ok',{
        duration: 10000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }
    
  })
    }
 }


 forgotPwd(){
   if(this.loginForm.controls.email.value){
    this.adminService.forgotPwd(this.loginForm.controls.email.value).subscribe(res=>{this.responseForgotPwd=JSON.parse(JSON.stringify(res))},
    err=>{},
    ()=>{
      if(this.responseForgotPwd=="Email sent!"){
        this._snackBar.open('Un email de récupération de mot de passe est envoyé','ok',{
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }else{
        this._snackBar.open("Une erreur s'est produite !",'ok',{
          duration: 10000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
    })
   }
    else{
      this._snackBar.open('Veuillez entrer votre adresse mail','ok',{
        duration: 10000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    } 

    
   
   
 }

}
