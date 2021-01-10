import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-digital-add',
  templateUrl: './digital-add.component.html',
  styleUrls: ['./digital-add.component.scss']
})
export class DigitalAddComponent implements OnInit {
  productForm: FormGroup
 categorie: Category;
 categories : any =  []
  constructor(private fb: FormBuilder, private cs: CategoryService) { }

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
    this.cs.getCategories().subscribe(result=>{
   result.forEach(element=>{
     this.categories.push(JSON.parse(JSON.stringify(element)))
   })
  console.log(this.categories);
  
    })
    this.productForm = new FormGroup({
      name: new FormControl(),
      price: new FormControl(),
      reference: new FormControl(),
      quantity: new FormControl(),
      // image: new FormControl(),
      category: new FormControl(),
      // marque: new FormControl(),
      // collections: new FormControl(),
      // artisant: new FormControl()
    });
  }
  userFormSubmit(){}
}
