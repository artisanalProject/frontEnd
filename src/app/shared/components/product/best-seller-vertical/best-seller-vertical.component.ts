import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/models/product';
import { NewProductSlider } from '../../../data/slider';
@Component({
  selector: 'app-best-seller-vertical',
  templateUrl: './best-seller-vertical.component.html',
  styleUrls: ['./best-seller-vertical.component.scss']
})
export class BestSellerVerticalComponent implements OnInit {

  @Input() title: string ; // Default
  @Input() type: string = 'fashion'; // Default Fashion

  public products : Product[] = [];

  public NewProductSliderConfig: any = NewProductSlider;

  constructor(public productService: ProductService) { 
   
  }

  ngOnInit(): void {
    console.log("hahahah");
    
    if(this.title=="Top products") {
      this.productService.getProducts().subscribe(response => {
        this.products = response.filter((x)=>x.topProduct==true)
      });
    }
    
  }

}
