import { Component, OnInit,AfterViewInit ,ViewChild} from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Product } from 'src/app/models/product';
import {MatDialog} from '@angular/material/dialog';
import { DialogContentExampleDialogComponent } from '../dialog-content-example-dialog/dialog-content-example-dialog.component';
@Component({
  selector: 'app-digital-list',
  templateUrl: './digital-list.component.html',
  styleUrls: ['./digital-list.component.scss']
})
export class DigitalListComponent implements OnInit, AfterViewInit {
  public products = []
  dataSource: MatTableDataSource<Product>;
  displayedColumns: string[] = ['ref', 'name', 'status','topProduct','creationDate','remise','category','buttons','editbutton'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private ps:ProductService,public dialog: MatDialog) {
    // this.digital_list = digitalListDB.digital_list;
   
  }

 

  ngOnInit() {
    this.getAllProduct()
   }
   getAllProduct(){
   
    this.ps.getProducts().subscribe(
      result => {
        this.products = JSON.parse(JSON.stringify(result));       
      },
      e => {console.log(e);
       },

  ()=>{ 
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.paginator = this.paginator;
this.dataSource.sort = this.sort;
  });
  }
  ngAfterViewInit() {
    
  }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
      this.getAllProduct()
      });
      }
    });
 
  }
}


