import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  files: File[] = [];
  product_id:string
  product : any
  productForm:FormGroup
  categorie: Category;
 categories : any =  [];
 marque: Marque;
 marques = [];
 artisant : Artisant;
 artisantList= [];
 collection:Collections;
 collections= []
 showMarque:boolean = true;

  constructor(private route: ActivatedRoute, private ps: ProductService, private fb :FormBuilder,
    private cs: CategoryService, 
    private ms: MarqueService,
     private as:ArtisantService,
     private collectionService: CollectionService,) {
    
   }

  ngOnInit(): void {
    this.getArtisant()
  this.getCategories()
  this.getCollections()
    this.product_id = this.route.snapshot.params.id;
    
    this.ps.getProductById(this.product_id).subscribe(res=>{      
      this.product=JSON.parse(JSON.stringify(res))
     
      },
      err=>{},
      ()=>{              
        this.categorie = this.product.category
     
        this.createProductForm()})  
   
  }
  show(e){
    if (e){
        this.showMarque= false;
        
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
  createProductForm()
    {    
         this.productForm = new FormGroup({
          name: new FormControl(this.product.name),
          price: new FormControl(this.product.price),
          reference: new FormControl(this.product.ref),
          quantity: new FormControl(this.product.quantity),
          category: new FormControl(this.product.category),
          marque: new FormControl(this.product.marque),
          collections: new FormControl(this.product.collections),
          artisant: new FormControl(this.product.artisant)
        });
       
        
    }
  updateProduct(){

  }
  onSelect(event) {
     
    this.files.push(...event.addedFiles);
    console.log(this.files);
  }
   onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
