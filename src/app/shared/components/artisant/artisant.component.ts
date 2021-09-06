import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ArtisantService } from '../../services/artisant.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-artisant',
  templateUrl: './artisant.component.html',
  styleUrls: ['./artisant.component.scss']
})
export class ArtisantComponent implements OnInit {

  public products: Product[] = [];
  public collapse: boolean = true;
  listArtisant= []
  constructor(public productService: ProductService,public artisantService: ArtisantService) { 
    this.productService.getProducts().subscribe(product => this.products = product);
  }

  ngOnInit(): void {
   this.artisantService.getArtisant().subscribe(res=>{
    this.listArtisant = JSON.parse(JSON.stringify(res))
   },err=>{console.log(err);
   },()=>{
     
   })
  }

}
