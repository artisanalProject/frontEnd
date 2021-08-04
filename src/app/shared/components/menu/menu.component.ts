import { Component, OnInit } from '@angular/core';
import { NavService, Menu } from '../../services/nav.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public menuItems: Menu[];
  categories :any[]

  constructor(private router: Router, public navServices: NavService,private catService: CategoryService) {
    this.navServices.items.subscribe(menuItems => this.menuItems = menuItems );
    this.catService.getCategories().subscribe(res=>{this.categories=JSON.parse(JSON.stringify(res))},
    err=>{console.log(err)},
    ()=>{
  
      
      console.log(this.categories);
           
       const childrens =[]
       this.categories.forEach(element => {
        const subChildrens=[];
        element.marque.forEach(e => {
          
          subChildrens.push({ path: '/shop/collection/left/sidebarx/'+e.name, title: e.name, type: 'link' })
        });
        var obj
            if(subChildrens.length!=0){
               obj=      { 
                title: element.name, type: 'link', path:"/shop/collection/left/sidebar/"+element.name, active: false, children:subChildrens
              }
            }
            else {
               obj={ path: '/shop/collection/left/sidebar/'+element.name, title: element.name, type: 'link' }
            }
         childrens.push(obj)
       });

       const indexShop = this.menuItems.findIndex(e=>e.title=='Shop')
       const path=  {path: '/shop/collection/left/sidebar',title: 'Shop', type: 'link', active: false, children: childrens}
       this.menuItems.splice(indexShop,1,path)
    //     path: '/shop/collection/left/sidebar',title: 'Shop', type: 'link', active: false, children: [
         
    //      { 
    //        title: 'clothing', type: 'sub', active: false, children: [
    //          { path: '/home/fashion', title: 'fashion-01', type: 'link' },
    //          { path: '/home/fashion-2', title: 'fashion-02', type: 'link' },
    //          { path: '/home/fashion-3', title: 'fashion-03', type: 'link' }
    //        ]
    //      },
    //      { path: '/home/vegetable', title: 'vegetable', type: 'link' },
    //      { path: '/home/watch', title: 'watch', type: 'link' },
    //      { path: '/home/furniture', title: 'furniture', type: 'link' },
    //      { path: '/home/flower', title: 'flower', type: 'link' },
    //      { path: '/home/beauty', title: 'beauty', type: 'link' },
    //      { path: '/home/electronics', title: 'electronics', type: 'link' },
    //      { path: '/home/pets', title: 'pets', type: 'link' },
    //      { path: '/home/gym', title: 'gym', type: 'link' },
    //      { path: '/home/tools', title: 'tools', type: 'link' },
    //      { path: '/home/shoes', title: 'shoes', type: 'link' },
    //      { path: '/home/bags', title: 'bags', type: 'link' },
    //      { path: '/home/marijuana', title: 'marijuana', type: 'link' }
    //    ]
    //  },)
    })
   
    
    this.router.events.subscribe((event) => {
      this.navServices.mainMenuToggle = false;
    });
  }

  ngOnInit(): void {
  }

  mainMenuToggle(): void {
    this.navServices.mainMenuToggle = !this.navServices.mainMenuToggle;
  }

  // Click Toggle menu (Mobile)
  toggletNavActive(item) {
    item.active = !item.active;
  }

}
