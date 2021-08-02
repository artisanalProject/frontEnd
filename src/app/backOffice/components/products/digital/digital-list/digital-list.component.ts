import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { ProductService } from "src/app/shared/services/product.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Product } from "src/app/models/product";
import { MatDialog } from "@angular/material/dialog";
import { DialogContentExampleDialogComponent } from "../dialog-content-example-dialog/dialog-content-example-dialog.component";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import Swal from "sweetalert2";
@Component({
  selector: "app-digital-list",
  templateUrl: "./digital-list.component.html",
  styleUrls: ["./digital-list.component.scss"],
})
export class DigitalListComponent implements OnInit, AfterViewInit {
  public products = [];
  dataSource: MatTableDataSource<Product>;
  displayedColumns: string[] = [
    "ref",
    "name",
    "active",
    "topProduct",
    "creationDate",
    "category",
    "buttons",
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private ps: ProductService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    // this.digital_list = digitalListDB.digital_list;
  }

  ngOnInit() {
    this.getAllProduct();
  }
  getAllProduct() {
    this.ps.getProducts().subscribe(
      (result) => {
        this.products = JSON.parse(JSON.stringify(result));
      },
      (e) => {
        console.log(e);
      },

      () => {
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }
  ngAfterViewInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  delete(product) {
    Swal.fire({
      title: "êtes-vous sûr de vouloir supprimer ce produit?",
      text: "Vous ne serez pas en mesure de récupérer ce produit!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.isConfirmed) {
        this.ps.deleteProduct(product._id).subscribe(
          (result) => {},
          (e) => {
            console.log(e);
          },

          () => {
            this.getAllProduct();
          }
        );
        Swal.fire(
          "produit supprimée!",
          "ce produit a été sypprimer avec succes.",
          "success"
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("annulé", "Votre produit est en sécurité :)", "error");
      }
    });
  }
  update(product) {
    console.log(product);
    this.router.navigateByUrl("products/update-product/" + product._id);
  }
  removeFromFavoris(product) {
    this.ps.removeFromFavoris(product._id).subscribe(
      (res) => {},
      (err) => {},
      () => {
        this._snackBar.open("produit retiré de la liste des favoris", "OK", {
          verticalPosition: "top",
          duration: 2000,
        });
        this.getAllProduct();
      }
    );
  }

  addToFavoris(product) {
    this.ps.addToFavoris(product._id).subscribe(
      (res) => {},
      (err) => {},
      () => {
        this._snackBar.open("produit aujouté à la liste des favoris", "OK", {
          verticalPosition: "top",
          duration: 2000,
        });
        this.getAllProduct();
      }
    );
  }
}
