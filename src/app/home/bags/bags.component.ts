import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductSlider, ProductOneSlider } from '../../shared/data/slider';
import { Product } from '../../models/product';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-bags',
  templateUrl: './bags.component.html',
  styleUrls: ['./bags.component.scss']
})
export class BagsComponent implements OnInit, OnDestroy {

  public themeLogo: string = 'assets/images/icon/logo-7.png'; // Change Logo
  public themeLogoWhite: string = 'assets/images/icon/logo-8.png'; // Change Logo
  
  public products: Product[] = [];
  public productCollections: any[] = [];

  public ProductSliderConfig: any = ProductSlider;
  public ProductSliderOneConfig: any = ProductOneSlider;
  collections=["NEW PRODUCTS","BEST SELLERS"]
  constructor(public productService: ProductService) {
    this.productService.getProducts().subscribe(response => {
      this.products = JSON.parse(JSON.stringify(response))
    },err=>{},
    ()=>{console.log(this.products);
    });
  }
  
  // Sliders
  public sliders = [{
    title: 'Artisanal',
    subTitle: 'Welcome',
    image: 'assets/images/slider/banner2.jpg'
  }, {
    title: 'Artisanal',
    subTitle: 'Welcome',
    image: 'assets/images/slider/banner2.jpg'
  },
  {
    title: 'Artisanal',
    subTitle: 'Welcome',
    image: 'assets/images/slider/banner4.jpg'
  }];

  // Categories
  public categories = ['airbag', 'burn bag', 'briefcase', 'carpet', 'money bag', 'tucker'];

  // Blog
  public blogs = [{
    image: 'assets/images/blog/37.jpg',
    date: '25 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/38.jpg',
    date: '26 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/39.jpg',
    date: '27 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/37.jpg',
    date: '28 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }];

  ngOnInit(): void {
    // Change color for this layout
    document.documentElement.style.setProperty('--theme-deafult', '#f0b54d');
  }

  ngOnDestroy(): void {
    // Remove Color
    document.documentElement.style.removeProperty('--theme-deafult');
  }
 
 // Product Tab collection
  getCollectionProducts(collection) {
    if(collection=="NEW PRODUCTS"){
      return this.products.sort((a,b)=>new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
    }else{  
      return this.products.sort((a,b)=>b.sellingNumber - a.sellingNumber)
   
    }
   
  }
  
}
