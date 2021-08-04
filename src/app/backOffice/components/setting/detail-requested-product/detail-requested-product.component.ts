import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/models/product';
import { DialogContentExampleDialogComponent } from '../../products/digital/dialog-content-example-dialog/dialog-content-example-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from "sweetalert2";
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
          ()=>{ console.log(this.product);
          })
      }
    );
   
  }

  refuse(product){
    Swal.fire({
      title: "êtes-vous sûr de vouloir refuser ce produit?",
      text: "Vous ne serez pas en mesure de récupérer ce produit!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.refuseProduct(product).subscribe(
          (result) => {},
          (e) => {
            console.log(e);
          },

          () => {
            this.ngOnInit();
            this.productService.nbNotifProducts()
          }
        );
        Swal.fire(
          "produit supprimée!",
          "ce produit a été sypprimer avec succes.",
          "success"
        );
      }
      
    });
 
  }
 
  accept(product){
    
    
    Swal.fire({
      title: "Etes-vous sûr de vouloir accepter ce produit?",
      text: "Ce produit cera visible pour tous les internautes!",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.acceptProduct(product).subscribe(
          (result) => {},
          (e) => {
            console.log(e);
          },

          () => {
            this.ngOnInit();
            this.productService.nbNotifProducts()
          }
        );
        Swal.fire(
          "Ce produit a été accepté avec succès.",
          "success"
        );
      }
      
    });
  }
  

}
