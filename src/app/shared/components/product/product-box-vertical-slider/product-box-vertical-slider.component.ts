import { Component, OnInit, Input } from '@angular/core';
import { NewProductSlider } from '../../../data/slider';
import { Product } from '../../../../models/product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-box-vertical-slider',
  templateUrl: './product-box-vertical-slider.component.html',
  styleUrls: ['./product-box-vertical-slider.component.scss']
})
export class ProductBoxVerticalSliderComponent implements OnInit {

  @Input() title: string; // Default
  @Input() type: string = 'fashion'; // Default Fashion

  public products : Product[] = [];

  public NewProductSliderConfig: any = NewProductSlider;

  constructor(public productService: ProductService) {


    
  }

  ngOnInit(): void {
    
    
    if(this.title=="New products") {
      this.productService.getProducts().subscribe(response => {
        response.splice(10)
        this.products = response.sort((a,b)=>new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
       
      });
      console.log(this.products);
    }
  }

}
