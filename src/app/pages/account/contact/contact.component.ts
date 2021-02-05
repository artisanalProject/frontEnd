import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'ngx-snackbar';
import { ContactService } from 'src/app/shared/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private cs : ContactService,private snackbarService: SnackbarService) { }
  contactForm: FormGroup
  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('',[ Validators.required, Validators.email]),
      phoneNumber: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    })
  }
  sendMessage(){
   this.cs.addContact(this.contactForm.value).subscribe(res=>{},err=>{},()=>{
    
   })
    
  }
}
