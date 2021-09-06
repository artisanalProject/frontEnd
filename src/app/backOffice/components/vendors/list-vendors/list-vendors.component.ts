import { Component, OnInit, ViewChild } from "@angular/core";
import { vendorsDB } from "../../../shared/tables/vendor-list";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Product } from "src/app/models/product";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ProductService } from "src/app/shared/services/product.service";
import { ArtisantService } from "src/app/shared/services/artisant.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-list-vendors",
  templateUrl: "./list-vendors.component.html",
  styleUrls: ["./list-vendors.component.scss"],
})
export class ListVendorsComponent implements OnInit {
  public listArtisant = [];
  dataSource: MatTableDataSource<Product>;
  displayedColumns: string[] = [
    "name",
    "email",
    "phoneNumber",
    "address",
    "storeName",
    "buttons",
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private as: ArtisantService) {}

  ngOnInit() {
    this.getAllArtisant();
  }
  getAllArtisant() {
    this.as.getArtisant().subscribe(
      (result) => {
        this.listArtisant = JSON.parse(JSON.stringify(result));
      },
      (e) => {
        console.log(e);
      },

      () => {
        this.dataSource = new MatTableDataSource(this.listArtisant);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }
  delete(id) {
    Swal.fire({
      title: "êtes-vous sûr de vouloir supprimer cet artisant?",
      text: "Vous ne serez pas en mesure de récupérer cet artisant!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.isConfirmed) {
        this.as.deleteAccount(id).subscribe(
          (result) => {},
          (e) => {
            console.log(e);
          },
          () => {
            this.getAllArtisant();
          }
        );
        Swal.fire(
          "artisant supprimée!",
          "cet artisant a été supprimer avec succes.",
          "success"
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("annulé", "cet artisant est en sécurité :)", "error");
      }
    });
  }
  ngAfterViewInit() {}
  applyFilter($event) {}
}
