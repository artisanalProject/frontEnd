import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavService } from '../../service/nav.service';
import { artisanService } from 'src/app/services/artisanService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public right_sidebar: boolean = false;
  public open: boolean = false;
  public openNav: boolean = false;
  public isOpenMobile : boolean;
  notActivated;
  @Output() rightSidebarEvent = new EventEmitter<boolean>();

  constructor(public navServices: NavService,private artisanService:artisanService) { }

  collapseSidebar() {
    this.open = !this.open;
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar
  }
  right_side_bar() {
    this.right_sidebar = !this.right_sidebar
    this.rightSidebarEvent.emit(this.right_sidebar)
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }


  ngOnInit() { 
    this.artisanService.NotActivatedAccounts().subscribe(res=>{this.notActivated=JSON.parse(JSON.stringify(res))},
    err=>{},
    ()=>{
      console.log(this.notActivated);
    })
   }

}
