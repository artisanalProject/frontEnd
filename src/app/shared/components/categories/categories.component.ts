import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../services/product.service';
import {CategoryService} from '../../services/category.service'
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public products: Product[] = [];
  public collapse: boolean = true;
cateories= []
  constructor(public productService: ProductService,public categoryService: CategoryService) { 
    this.productService.getProducts().subscribe(product => this.products = product);
  }

  ngOnInit(): void {
   this.categoryService.getCategories().subscribe(res=>{
    this.cateories = JSON.parse(JSON.stringify(res))
   },err=>{console.log(err);
   })
  }

  // get filterbyCategory() {
  //   const category = [...new Set(this.products.map(product => product.type))]
  //   return category
  // }

}
