import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/shared/services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incoming-messages',
  templateUrl: './incoming-messages.component.html',
  styleUrls: ['./incoming-messages.component.scss']
})
export class IncomingMessagesComponent implements OnInit {

  constructor(private contactService : ContactService,private router : Router) { }
  incomingMessages:[]=[]
 
  ngOnInit(): void {
     this.contactService.getContact().subscribe(res=>{this.incomingMessages=JSON.parse(JSON.stringify(res))
    console.log(res);
    });
    
  }
  redirectToFullMsg(id){
    this.router.navigateByUrl('/settings/messages/'+id)
  }

}
