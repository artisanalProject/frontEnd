import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Artisant } from 'src/app/models/artisant';
import { Category } from 'src/app/models/category';
// import { Collections } from 'src/app/models/collections';
import { Marque } from 'src/app/models/marque';
import { Product } from 'src/app/models/product';

import { CategoryService } from 'src/app/shared/services/category.service';
// import { CollectionService } from 'src/app/shared/services/collection.service';
import { MarqueService } from 'src/app/shared/services/marque.service';

import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { artisanService } from 'src/app/services/artisanService';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-add-product-artisan',
  templateUrl: './add-product-artisan.component.html',
  styleUrls: ['./add-product-artisan.component.scss']
})
export class AddProductArtisanComponent implements OnInit {
  productForm: FormGroup
  categorie: Category;
  categories : any =  [];
  marque: Marque;
  marques = [];
  artisant : Artisant;
  artisantList= [];
  //collection:Collections;
 // collections= []
  files: File[] = [];
  showMarque:boolean = true;
  checked:boolean = false
  formData: FormData = new FormData();
  product : Product = new Product();
  nbNotif;
   constructor(private fb: FormBuilder, 
     private cs: CategoryService, 
     private ms: MarqueService,
      private as:artisanService,
      private productServive : ProductService,
 //     private collectionService: CollectionService,
      private _snackBar: MatSnackBar,
      private router:Router ) { }
 
   public config1: DropzoneConfigInterface = {
     clickable: true,
     maxFiles: 1,
     autoReset: null,
     errorReset: null,
     cancelReset: null
   };
 
   public onUploadInit(args: any): void { }
 
   public onUploadError(args: any): void { }
 
   public onUploadSuccess(args: any): void { }
 
   ngOnInit() {
     console.log((JSON.parse(localStorage.getItem('connectedUser')).artisan._id));
     
   //this.getArtisant()
   this.getCategories()
   // this.getCollections()
     this.productForm = new FormGroup({
       name: new FormControl(),
       price: new FormControl(),
       reference: new FormControl(),
       quantity: new FormControl(),
       category: new FormControl(),
       marque: new FormControl(),
     //  collections: new FormControl(),
       artisan: new FormControl(JSON.parse(localStorage.getItem('connectedUser')).artisan._id),
       description: new FormControl(),
       remise: new FormControl()
     });
     
   }
   show(e){
     if (e){
         this.showMarque= false;
      
         
      this.ms.getMarqueByCategoryId(e).subscribe(res=>{
          this.marques = JSON.parse(JSON.stringify(res))
      },
      error=>{
       
      })
     }
  }
//   getArtisant(){
//  this.as.getArtisant().subscribe(res=>{
//    this.artisantList = JSON.parse(JSON.stringify(res))
//  })
//   }
 //  getCollections(){
 //    this.collectionService.getCollection().subscribe(result=>{
 // this.collections= JSON.parse(JSON.stringify(result))
 //    })
 //  }
  getCategories(){
   this.cs.getCategories().subscribe(result=>{
     result.forEach(element=>{
       this.categories.push(JSON.parse(JSON.stringify(element)))
     })
    
      },
      err=>{
      },
      ()=>{
        this.categories.forEach(element => {
          element.marque.forEach(marque => {
            this.marques.push(marque);
          });
          
        });
      })
  }
  onSelect(event) {
      
   this.files.push(...event.addedFiles);
   console.log(this.files);
 }
  onRemove(event) {
   this.files.splice(this.files.indexOf(event), 1);
 }
 addProduct():void{     
  
   
     var data = this.productForm.getRawValue()  
    console.log(data);
    
       
     this.formData.set('name',data.name)
     this.formData.set('prix',data.price)
     this.formData.set('reference',data.reference)
     this.formData.set('category',data.category)
     this.formData.set('artisan',data.artisan)
     this.formData.set('quantity',data.quantity)
     this.formData.set('marque',data.marque)
     this.formData.set('collections',data.collections)
     this.formData.set('description',data.description)
     this.formData.set('new',data.new)
     this.formData.set('remise',data.remise)
     let images=[];
     this.files.forEach(element => {
        images.push(element)
     });         
     let fileCount = this.files.length;
     if(fileCount>0){
         for(let i=0;i<fileCount;i++){
            this.formData.append('images',images[i]);
         }
     }
 
     console.log(this.formData);
     
    this.as.RequestProduct(this.formData).subscribe(
      res=>{
        console.log(res);
        
      },
      err=>{
        console.log(err);
        
      },
      ()=>{
         // Show the success message
         this._snackBar.open('Product added', 'OK', {
           verticalPosition: 'top',
           duration        : 2000
       });
       this.productServive.getProducts().subscribe(res=>{
         this.nbNotif=JSON.parse(JSON.stringify(res)).filter(e=>e.status=="Requested").length;
       },err=>{},
       ()=>{
         this.productServive.notifProducts.next(this.nbNotif)
       })
       // // Change the location with new one
       this.router.navigateByUrl('/products/pending-products')
      }
    )
 }
    

}
