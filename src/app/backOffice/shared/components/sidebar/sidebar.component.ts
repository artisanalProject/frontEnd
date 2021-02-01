import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavService, Menu } from '../../service/nav.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit{
  

  public menuItems: Menu[];
  public url: any;
  public fileurl: any;


  constructor(private router: Router, public navServices: NavService) {
    console.log(JSON.parse(localStorage.getItem('connectedUser')));
    
    this.navServices.items.subscribe(menuItems => {
      this.menuItems = menuItems;
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          menuItems.filter(items => {
            if (items.path === event.url)
              this.setNavActive(items)
            if (!items.children) return false
            items.children.filter(subItems => {
              if (subItems.path === event.url)
                this.setNavActive(subItems)
              if (!subItems.children) return false
              subItems.children.filter(subSubItems => {
                if (subSubItems.path === event.url)
                  this.setNavActive(subSubItems)
              })
            })
          })
        }
      })
    })
   console.log(this.menuItems);
  //   if(JSON.parse(localStorage.getItem('connectedUser')).admin){
  //   this.menuItems.splice(this.menuItems.findIndex(x=>x.title=='My products'),1)
  //   this.menuItems.splice(this.menuItems.findIndex(x=>x.title=='Coupons'),1)
  //   this.menuItems.splice(this.menuItems.findIndex(x=>x.title=='Pages'),1)
  //   this.menuItems.splice(this.menuItems.findIndex(x=>x.title=='Media'),1)
  //   this.menuItems.splice(this.menuItems.findIndex(x=>x.title=='Menus'),1)
  //   this.menuItems.splice(this.menuItems.findIndex(x=>x.title=='Reports'),1)
  //   this.menuItems.splice(this.menuItems.findIndex(x=>x.title=='Users'),1)
  //   this.menuItems.splice(this.menuItems.findIndex(x=>x.title=='Vendors'),1)
  //   this.menuItems.splice(this.menuItems.findIndex(x=>x.title=='Localization'),1)
  //   this.menuItems.splice(this.menuItems.findIndex(x=>x.title=='Settings'),1)
  //   this.menuItems.splice(this.menuItems.findIndex(x=>x.title=='Invoice'),1)
  //  }
  //  else if(JSON.parse(localStorage.getItem('connectedUser')).artisan){
  //   this.menuItems.splice(this.menuItems.findIndex(x=>x.title=='Dashboard'),1)
  //   this.menuItems.splice(this.menuItems.findIndex(x=>x.title=='Produits'),1)
  //   this.menuItems.splice(this.menuItems.findIndex(x=>x.title=='Sales'),1)
  //   this.menuItems.splice(this.menuItems.findIndex(x=>x.title=='Coupons'),1)
  //   this.menuItems.splice(this.menuItems.findIndex(x=>x.title=='Pages'),1)
  //   this.menuItems.splice(this.menuItems.findIndex(x=>x.title=='Media'),1)
  //   this.menuItems.splice(this.menuItems.findIndex(x=>x.title=='Menus'),1)
  //   this.menuItems.splice(this.menuItems.findIndex(x=>x.title=='Reports'),1)
  //   this.menuItems.splice(this.menuItems.findIndex(x=>x.title=='Users'),1)
  //   this.menuItems.splice(this.menuItems.findIndex(x=>x.title=='Vendors'),1)
  //   this.menuItems.splice(this.menuItems.findIndex(x=>x.title=='Localization'),1)
  //   this.menuItems.splice(this.menuItems.findIndex(x=>x.title=='Settings'),1)
  //   this.menuItems.splice(this.menuItems.findIndex(x=>x.title=='Invoice'),1)
  //  }

   
  }

  ngOnInit(): void {
    
  }

  // Active Nave state
  setNavActive(item) {
    this.menuItems.filter(menuItem => {
      if (menuItem != item)
        menuItem.active = false
      if (menuItem.children && menuItem.children.includes(item))
        menuItem.active = true
      if (menuItem.children) {
        menuItem.children.filter(submenuItems => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true
            submenuItems.active = true
          }
        })
      }
    })
  }

  // Click Toggle menu
  toggletNavActive(item) {
    if (!item.active) {
      this.menuItems.forEach(a => {
        if (this.menuItems.includes(item))
          a.active = false
        if (!a.children) return false
        a.children.forEach(b => {
          if (a.children.includes(item)) {
            b.active = false
          }
        })
      });
    }
    item.active = !item.active
  }

  //Fileupload
  readUrl(event: any) {
    if (event.target.files.length === 0)
      return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    // Image upload
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }

}
