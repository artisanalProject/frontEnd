import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Artisant } from 'src/app/models/artisant';
import { Category } from 'src/app/models/category';
import { Marque } from 'src/app/models/marque';
import { Product } from 'src/app/models/product';
import { ArtisantService } from 'src/app/shared/services/artisant.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { MarqueService } from 'src/app/shared/services/marque.service';

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
 artisantList= []
 showMarque:boolean = true;
 product : Product = new Product()
  constructor(private fb: FormBuilder, private cs: CategoryService, private ms: MarqueService, private as:ArtisantService) { }

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
    this.productForm = new FormGroup({
      name: new FormControl(),
      price: new FormControl(),
      reference: new FormControl(),
      quantity: new FormControl(),
      // image: new FormControl(),
      category: new FormControl(),
      marque: new FormControl(),
      // collections: new FormControl(),
      artisant: new FormControl()
    });
    console.log(this.productForm.value);
    
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
 getCategories(){
  this.cs.getCategories().subscribe(result=>{
    result.forEach(element=>{
      this.categories.push(JSON.parse(JSON.stringify(element)))
    })
   
     },
     err=>{},
     ()=>{
       this.categories.forEach(element => {
         element.marque.forEach(marque => {
           this.marques.push(marque);
         });
         
       });
     })
 }
  userFormSubmit(){
  console.log(this.productForm.value);
   
  }
}
