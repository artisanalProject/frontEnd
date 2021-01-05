import { Component, OnInit } from '@angular/core';
import { productDB } from 'src/app/backOffice/shared/tables/product-list';
import {ProductService} from 'src/app/shared/services/product.service'
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public product_list = []

  constructor(private ps:ProductService) {
    // this.product_list = productDB.product;

  }

  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct(){
   
    this.ps.getProducts().subscribe(
      result => {
        this.product_list = JSON.parse(JSON.stringify(result));
      },
      e => {console.log(e);
       },

  ()=>{ 
    console.log("aaa");
    
    console.log(this.product_list);
    
  });
  }
}
