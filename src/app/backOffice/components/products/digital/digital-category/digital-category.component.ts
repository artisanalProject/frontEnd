import { Component, OnInit, ViewChild } from '@angular/core';
import { digitalCategoryDB } from 'src/app/backOffice/shared/tables/digital-category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/shared/services/category.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentExampleDialogComponent } from '../dialog-content-example-dialog/dialog-content-example-dialog.component';
import { ModalUpdateComponent } from './modal-update/modal-update.component';

@Component({
  selector: 'app-digital-category',
  templateUrl: './digital-category.component.html',
  styleUrls: ['./digital-category.component.scss']
})
export class DigitalCategoryComponent implements OnInit {
  dataSource: MatTableDataSource<Category>;
  categories=[]
  Category : Category
  displayedColumns: string[] = [ 'name','buttons'];
  categoryForm:FormGroup
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private categoyService: CategoryService,
    private _snackBar: MatSnackBar,
    private router : Router,
    public dialog: MatDialog) {
      dialog.afterAllClosed
    .subscribe(() => {
    // update a variable or call a function when the dialog closes
      this.getCategories();
    }
  );
   
  }

 

  ngOnInit() {
    this.categoryForm = new FormGroup({
      name: new FormControl()
    });
    this.getCategories()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getCategories(){
    this.categoyService.getCategories().subscribe(res=>{
    this.categories = JSON.parse(JSON.stringify(res))
    },
    err=>{},
    ()=>{
      this.dataSource = new MatTableDataSource(this.categories);
      this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
    })
  }
  addCategory(){
    var data = this.categoryForm.getRawValue() 
    this.categoyService.addCategory(data).subscribe(
      res=>{
        console.log(res);
        
      },
      err=>{
        console.log(err);
        
      },
      ()=>{
         // Show the success message
         this._snackBar.open('une nouvelle categorie est ajouter avec succes', 'OK', {
           verticalPosition: 'top',
           duration        : 2000
       });
       this.getCategories()
       this.categoryForm.reset();
      
      
      }
    )
  }
  delete(category){
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === "true"){
        this.categoyService.deleteCategory(category._id).subscribe(
          result => {
          },
          e => {console.log(e);
           },
    
      ()=>{ 
         // Show the success message
         this._snackBar.open('une categorie est supprimé avec succes', 'OK', {
          verticalPosition: 'top',
          duration        : 2000
      });
      this.getCategories()
      });
      }
    });
  }
  update(category){
    this.dialog.open(ModalUpdateComponent,{
      width: '330px',
      data: {
        dataKey: category
      }});

  }


}

 