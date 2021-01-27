import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { MarqueService } from '../../services/marque.service';

@Component({
  selector: 'app-marques',
  templateUrl: './marques.component.html',
  styleUrls: ['./marques.component.scss']
})
export class MarquesComponent implements OnInit {
  // public products: Product[] = [];
  public collapse: boolean = true;
marques= []
  constructor(public marqueService: MarqueService) { 
    // this.productService.getProducts().subscribe(product => this.products = product);
  }

  ngOnInit(): void {
   this.marqueService.getMarques().subscribe(res=>{
    this.marques = JSON.parse(JSON.stringify(res))
   },err=>{console.log(err);
   })
  }

}
