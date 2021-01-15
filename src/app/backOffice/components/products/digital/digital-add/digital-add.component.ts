import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Artisant } from 'src/app/models/artisant';
import { Category } from 'src/app/models/category';
import { Collections } from 'src/app/models/collections';
import { Marque } from 'src/app/models/marque';
import { Product } from 'src/app/models/product';
import { ArtisantService } from 'src/app/shared/services/artisant.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { CollectionService } from 'src/app/shared/services/collection.service';
import { MarqueService } from 'src/app/shared/services/marque.service';
import { ProductService } from 'src/app/shared/services/product.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-digital-add',
  templateUrl: './digital-add.component.html',
  styleUrls: ['./digital-add.component.scss']
})
export class DigitalAddComponent implements OnInit {
  productForm: FormGroup
 categorie: Category;
 categories : any =  [];
 marque: Marque;
 marques = [];
 artisant : Artisant;
 artisantList= [];
 collection:Collections;
 collections= []
 files: File[] = [];
 showMarque:boolean = true;
 formData: FormData = new FormData();
 product : Product = new Product()
  constructor(private fb: FormBuilder, 
    private cs: CategoryService, 
    private ms: MarqueService,
     private as:ArtisantService,
     private collectionService: CollectionService,
     private productService:ProductService,
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
  this.getArtisant()
  this.getCategories()
  this.getCollections()
    this.productForm = new FormGroup({
      name: new FormControl(),
      price: new FormControl(),
      reference: new FormControl(),
      quantity: new FormControl(),
      category: new FormControl(),
      marque: new FormControl(),
      collections: new FormControl(),
      artisant: new FormControl()
    });
    
  }
  show(e){
    if (e){
        this.showMarque= false;
        console.log(e);
        
     this.ms.getMarqueByCategoryId(e).subscribe(res=>{
         this.marques = JSON.parse(JSON.stringify(res))
     },
     error=>{
         console.log(error);
         
     })
    }
 }
 getArtisant(){
this.as.getArtisant().subscribe(res=>{
  this.artisantList = JSON.parse(JSON.stringify(res))
})
 }
 getCollections(){
   this.collectionService.getCollection().subscribe(result=>{
this.collections= JSON.parse(JSON.stringify(result))
   })
 }
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
   
      
    this.formData.set('name',data.name)
    this.formData.set('prix',data.price)
    this.formData.set('reference',data.reference)
    this.formData.set('category',data.category)
    this.formData.set('artisant',data.artisant)
    this.formData.set('quantity',data.quantity)
    this.formData.set('marque',data.marque)
    this.formData.set('collections',data.collections)
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


   this.productService.addProduct(this.formData).subscribe(
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
      // // Change the location with new one
      this.router.navigateByUrl('/products/digital/digital-product-list')
     }
   )
}
   
  }

