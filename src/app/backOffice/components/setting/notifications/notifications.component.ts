import { Component, OnInit, ViewChild} from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Product } from 'src/app/models/product';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogContentExampleDialogComponent } from '../../products/digital/dialog-content-example-dialog/dialog-content-example-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  
  public products = []
  dataSource: MatTableDataSource<Product>;
  displayedColumns: string[] = ['ref', 'name','creationDate','buttons'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private ps:ProductService,public dialog: MatDialog, private router: Router,private snackBar: MatSnackBar) {
    // this.digital_list = digitalListDB.digital_list;
   
  }

 

  ngOnInit() {
   
    
    this.getAllProduct()
   }
   getAllProduct(){
    
    this.ps.getProducts().subscribe(
      result => {
        this.products = JSON.parse(JSON.stringify(result)).filter(e=>e.status=="Requested");       
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

  view(product){
    console.log(product);
    this.router.navigateByUrl("settings/details-product/"+product._id)
    
  }
 
  
}
