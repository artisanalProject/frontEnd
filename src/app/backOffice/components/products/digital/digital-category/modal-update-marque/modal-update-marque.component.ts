import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MarqueService } from 'src/app/shared/services/marque.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-modal-update-marque',
  templateUrl: './modal-update-marque.component.html',
  styleUrls: ['./modal-update-marque.component.scss']
})
export class ModalUpdateMarqueComponent implements OnInit {

  marqueForm:FormGroup
  categories=[]
  marque:any
  public breakpoint: number;
  constructor(private marqueService:MarqueService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  private _snackBar: MatSnackBar,
  private dialogRef: MatDialogRef<ModalUpdateMarqueComponent>,
  private categoryService:CategoryService) { }
  

  ngOnInit(): void {
    this.getCategories()
    this.marque = this.data.dataKey
    
    this.marqueForm = new FormGroup({
      name: new FormControl(this.data.dataKey.name),
      category : new FormControl(this.data.dataKey.category)
    })
  }
  
  updateMarque(){
    this.marqueService.updateMarque(this.data.dataKey._id,this.marqueForm.value).subscribe(
      result => {
      },
      e => {console.log(e);
       },

  ()=>{ 
     // Show the success message
     this._snackBar.open('cette marque est modifier avec succes', 'OK', {
      verticalPosition: 'top',
      duration        : 2000
  });
  this.dialogRef.close();
  });
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(result=>{
      result.forEach(element=>{
        this.categories.push(JSON.parse(JSON.stringify(element)))
      })
     
       },
       err=>{
       },
       ()=>{
       })
   }
}
