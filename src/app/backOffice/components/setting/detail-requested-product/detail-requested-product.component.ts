import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/models/product';
import { DialogContentExampleDialogComponent } from '../../products/digital/dialog-content-example-dialog/dialog-content-example-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail-requested-product',
  templateUrl: './detail-requested-product.component.html',
  styleUrls: ['./detail-requested-product.component.scss']
})
export class DetailRequestedProductComponent implements OnInit {

  product : Product
  constructor(private route: ActivatedRoute,
              private productService : ProductService,
              public dialog: MatDialog,
              private router: Router,
              private snackBar: MatSnackBar
              ) {

    
   }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.productService.getProductById(params['id']).subscribe(
          res=>{this.product=JSON.parse(JSON.stringify(res))},
          err=>{},
          ()=>{ console.log(this.product);})
      }
    );
   
  }

  delete(id ){
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === "true"){
        this.productService.refuseProduct(id).subscribe(
          result => {
          },
          e => {console.log(e);
           },
    
      ()=>{ 
        this.snackBar.open('Produit refusé et ne sera pas affiché dans le shop', 'OK', {
          verticalPosition: 'top',
          duration        : 2000
      });
      this.router.navigateByUrl("settings/Notifications")
      });
      }
    });
 
  }
 
  accept(id){
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === "true"){
        this.productService.acceptProduct(id).subscribe(
          result => {
          },
          e => {console.log(e);
           },
    
      ()=>{ 
        this.snackBar.open('Produit accepté et sera affiché dans le shop', 'OK', {
          verticalPosition: 'top',
          duration        : 2000
      });
      this.router.navigateByUrl("settings/Notifications")
      });
      }
    });
  }
  

}
