import { Component, OnInit } from '@angular/core';
import { artisanService } from 'src/app/services/artisanService';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pending-registration',
  templateUrl: './pending-registration.component.html',
  styleUrls: ['./pending-registration.component.scss']
})
export class PendingRegistrationComponent implements OnInit {
  notActivated;
  nbNotActivated;
  constructor(private artisanService:artisanService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.artisanService.NotActivatedAccounts().subscribe(res=>{this.notActivated=JSON.parse(JSON.stringify(res))},
    err=>{},
    ()=>{
      console.log(this.notActivated);
      this.nbNotActivated=this.notActivated.length
    })
  }

  activate(id,name){
    this.artisanService.activateAccount(id).subscribe(res=>{},err=>{},()=>{
      this._snackBar.open('Compte Activé, un mail est envoyé à '+name,'ok',{
        duration: 10000,
        verticalPosition: 'top',  
        horizontalPosition: 'center',
      });
      this.ngOnInit()
    })
  }

}
