import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-modal-update',
  templateUrl: './modal-update.component.html',
  styleUrls: ['./modal-update.component.scss']
})
export class ModalUpdateComponent implements OnInit {
  categoryForm:FormGroup
  public breakpoint: number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private categoryService:CategoryService,
  private _snackBar: MatSnackBar,
  private dialogRef: MatDialogRef<ModalUpdateComponent>) { }
  // public onResize(event: any): void {
  //   this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  // }
  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      name: new FormControl(this.data.dataKey.name)
    })
  }
  updateCategory(){
    this.categoryService.updateCategory(this.data.dataKey._id,this.categoryForm.value).subscribe(
      result => {
      },
      e => {console.log(e);
       },

  ()=>{ 
     // Show the success message
     this._snackBar.open('cette categorie est modifier avec succes', 'OK', {
      verticalPosition: 'top',
      duration        : 2000
  });
  this.dialogRef.close();
  });
  }

}
