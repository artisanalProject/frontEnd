import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { Image } from '@ks89/angular-modal-gallery';
import { ModalDismissReasons, NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailsMainSlider, ProductDetailsThumbSlider } from 'src/app/shared/data/slider';
import {MatDialog} from '@angular/material/dialog';
import { DialogContentExampleDialogComponent } from '../dialog-content-example-dialog/dialog-content-example-dialog.component';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product_id:string;
  product : any
  ratingValue : number;
  public ImageSrc : string
  //old one 
  public closeResult: string;
  public counter: number = 1;
  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;
 
  public imagesRect: Image[] = []
    // new Image(0, { img: 'assets/images/pro3/2.jpg' }, { img: 'assets/images/pro3/1.jpg' }),
    // new Image(1, { img: 'assets/images/pro3/27.jpg' }, { img: 'assets/images/pro3/27.jpg' }),
    // new Image(2, { img: 'assets/images/pro3/1.jpg' }, { img: 'assets/images/pro3/1.jpg' }),
    // new Image(3, { img: 'assets/images/pro3/2.jpg' }, { img: 'assets/images/pro3/2.jpg' })]
//end of 
  
  constructor(private route: ActivatedRoute,public dialog: MatDialog,
    private ps: ProductService,private router : Router,
    private modalService: NgbModal, config: NgbRatingConfig) {
      config.max = 5;
      config.readonly = false;
     }

  ngOnInit(): void {
    this.product_id = this.route.snapshot.params.id;
    this.ps.getProductById(this.product_id).subscribe(res=>{      
      this.product=JSON.parse(JSON.stringify(res))
    
      },
      err=>{},
      ()=>{   
       this.product.images.forEach((element,i)=> {
         console.log(element);
         
         this.imagesRect.push(new Image(i, { img: '/api/'+element}, { img: '/api/'+element}))
       });
           
       this.ratingValue = this.product.ratingMoyenne
       console.log(this.ratingValue);
      
       })  
  }
  delete(product){
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === "true"){
        this.ps.deleteProduct(product._id).subscribe(
          result => {
          },
          e => {console.log(e);
           },
    
      ()=>{ 
    this.router.navigateByUrl('/products/product-list')
      });
      }
    });
 
  }
  
  update(product){
    console.log(product);
    this.router.navigateByUrl("products/update-product/"+product._id)
    
  }


 
}
