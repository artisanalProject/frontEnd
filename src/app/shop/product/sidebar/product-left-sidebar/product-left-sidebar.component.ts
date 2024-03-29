import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsMainSlider, ProductDetailsThumbSlider } from '../../../../shared/data/slider';
import { Product } from '../../../../models/product';
import { ProductService } from '../../../../shared/services/product.service';
import { SizeModalComponent } from "../../../../shared/components/modal/size-modal/size-modal.component";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-left-sidebar',
  templateUrl: './product-left-sidebar.component.html',
  styleUrls: ['./product-left-sidebar.component.scss']
})
export class ProductLeftSidebarComponent implements OnInit {

  public product: any
  public counter: number = 1;
  public activeSlide: any = 0;
  public selectedSize: any;
  public mobileSidebar: boolean = false;
  public Product : Product
  starRating = 0
  emailStatus;
  @ViewChild("sizeChart") SizeChart: SizeModalComponent;
  
  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;
  idProduct;
  ReviewForm : FormGroup
  constructor(private route: ActivatedRoute, private router: Router,
    public productService: ProductService,   private toastr: ToastrService) { 
    }

  ngOnInit(): void {
    

    this.ReviewForm = new FormGroup({
      name : new FormControl('',Validators.required),
      email:new FormControl('',[Validators.email , Validators.required]),
      description: new FormControl('',Validators.required),
      subject: new FormControl(''),
      rateNumber : new FormControl(this.starRating)
    })
   
    this.idProduct = this.route.snapshot.params['id'];
    let cart = JSON.parse(localStorage.getItem('cartItems'))
    console.log(cart);
    
   const prod= cart.find(p=>p._id==this.idProduct)
   if(prod){
     this.counter=prod.quantity
     console.log(this.counter);
     
   }
    this.productService.getProductById(this.idProduct).subscribe(product=>{
   this.product = product
   
    },err=>{
      console.log(err);
      
    },()=>{console.log(this.product);
    })

   
  }
  showRate(){
    
    
  }
  // Get Product Color
  // Color(variants) {
  //   const uniqColor = []
  //   for (let i = 0; i < Object.keys(variants).length; i++) {
  //     if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
  //       uniqColor.push(variants[i].color)
  //     }
  //   }
  //   return uniqColor
  // }

  // Get Product Size
  // Size(variants) {
  //   const uniqSize = []
  //   for (let i = 0; i < Object.keys(variants).length; i++) {
  //     if (uniqSize.indexOf(variants[i].size) === -1 && variants[i].size) {
  //       uniqSize.push(variants[i].size)
  //     }
  //   }
  //   return uniqSize
  // }

  // selectSize(size) {
  //   this.selectedSize = size;
  // }
  
  // Increament
  increment(p) {
    this.counter++ ;
  }

  // Decrement
  decrement() {
    if (this.counter > 1) this.counter-- ;
  }

  // Add to cart
  async addToCart(product: any) {
    product.quantity =1;
    const status = await this.productService.addToCart(product);
    if(status)
      this.router.navigate(['/shop/cart']);
  }

  // Buy Now
  async buyNow(product: any) {
    product.quantity = this.counter || 1;
    const status = await this.productService.addToCart(product);
    if(status)
      this.router.navigate(['/shop/checkout']);
  }

  // Add to Wishlist
  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }

  // Toggle Mobile Sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }
  submitReview(){
  
    this.productService.verifEmailReview(this.idProduct,this.ReviewForm.value.email)
    .subscribe(res=>{
      console.log(res);
      
      this.emailStatus = res
    },
    err=>{},
    ()=>{
      if(this.emailStatus ==false){
        this.productService.postReview(this.idProduct,this.ReviewForm.value).subscribe(
          result=>{
          },
          err=>{},
          ()=>{
            this.toastr.success('your review is sent successefully', 'Review sent!');
            this.ReviewForm.reset()
          }
        )
      }
      else{
        this.toastr.warning('you already sent a review with this email for this product', 'oops!');
        
      }
    })
    
 
    
  }
  
}
