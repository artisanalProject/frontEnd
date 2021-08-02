import { Component, OnInit, ViewChild } from "@angular/core";
import { digitalCategoryDB } from "src/app/backOffice/shared/tables/digital-category";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { MatTableDataSource } from "@angular/material/table";
import { Category } from "src/app/models/category";
import { CategoryService } from "src/app/shared/services/category.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FormControl, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { DialogContentExampleDialogComponent } from "../dialog-content-example-dialog/dialog-content-example-dialog.component";
import { ModalUpdateComponent } from "./modal-update/modal-update.component";
import { MarqueService } from "src/app/shared/services/marque.service";
import { Marque } from "src/app/models/marque";
import { ModalUpdateMarqueComponent } from "./modal-update-marque/modal-update-marque.component";
import Swal from "sweetalert2";
@Component({
  selector: "app-digital-category",
  templateUrl: "./digital-category.component.html",
  styleUrls: ["./digital-category.component.scss"],
})
export class DigitalCategoryComponent implements OnInit {
  dataSource: MatTableDataSource<Category>;
  dataSourceMarque: MatTableDataSource<Marque>;
  categories = [];
  marques = [];
  Category: Category;
  displayedColumns: string[] = ["name", "buttons"];
  displayedColumnsMarque: string[] = ["name", "category", "buttons"];
  categoryForm: FormGroup;
  marqueFrom: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private categoyService: CategoryService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private marqueService: MarqueService
  ) {
    dialog.afterAllClosed.subscribe(() => {
      // update a variable or call a function when the dialog closes
      this.getCategories();
    });
  }

  ngOnInit() {
    this.categoryForm = new FormGroup({
      name: new FormControl(),
    });
    this.marqueFrom = new FormGroup({
      name: new FormControl(),
      category: new FormControl(),
    });
    this.getCategories();
    this.getMarques();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterMarque(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceMarque.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceMarque.paginator) {
      this.dataSourceMarque.paginator.firstPage();
    }
  }

  getCategories() {
    this.categoyService.getCategories().subscribe(
      (res) => {
        this.categories = JSON.parse(JSON.stringify(res));
      },
      (err) => {},
      () => {
        this.dataSource = new MatTableDataSource(this.categories);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }
  addCategory() {
    var data = this.categoryForm.getRawValue();
    this.categoyService.addCategory(data).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      },
      () => {
        // Show the success message
        this._snackBar.open(
          "une nouvelle categorie est ajouter avec succes",
          "OK",
          {
            verticalPosition: "top",
            duration: 2000,
          }
        );
        this.getCategories();
        this.categoryForm.reset();
      }
    );
  }
  addMarque() {
    var data = this.marqueFrom.getRawValue();
    this.marqueService.addMarque(data).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      },
      () => {
        // Show the success message
        this._snackBar.open(
          "une nouvelle categorie est ajouter avec succes",
          "OK",
          {
            verticalPosition: "top",
            duration: 2000,
          }
        );
        this.getMarques();
        this.marqueFrom.reset();
      }
    );
  }
  getMarques() {
    this.marqueService.getMarques().subscribe(
      (res) => {
        this.marques = JSON.parse(JSON.stringify(res));
      },
      (err) => {},
      () => {
        this.dataSourceMarque = new MatTableDataSource(this.marques);
        this.dataSourceMarque.paginator = this.paginator;
        this.dataSourceMarque.sort = this.sort;
      }
    );
  }
  delete(category) {
    Swal.fire({
      title: "êtes-vous sûr de vouloir supprimer cette catégorie?",
      text: "Vous ne serez pas en mesure de récupérer cette catégorie!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoyService.deleteCategory(category._id).subscribe(
          (result) => {},
          (e) => {
            console.log(e);
          },

          () => {
            this.getCategories();
            this.getMarques();
          }
        );
        Swal.fire(
          "catégorie supprimée!",
          "cette catégorie a été sypprimer avec succes.",
          "success"
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("annulé", "Votre catégorie est en sécurité :)", "error");
      }
    });
  }
  deleteMarque(marque) {
    Swal.fire({
      title: "êtes-vous sûr de vouloir supprimer cette marque?",
      text: "Vous ne serez pas en mesure de récupérer cette marque!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.isConfirmed) {
        this.marqueService.deleteMarque(marque._id).subscribe(
          (result) => {},
          (e) => {
            console.log(e);
          },

          () => {
            this.getMarques();
          }
        );
        Swal.fire(
          "marque supprimée!",
          "cette marque a été sypprimer avec succes.",
          "success"
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("annulé", "Votre marque est en sécurité :)", "error");
      }
    });
  }
  update(category) {
    this.dialog.open(ModalUpdateComponent, {
      width: "330px",
      data: {
        dataKey: category,
      },
    });
  }
  updateMarque(marque) {
    this.dialog.open(ModalUpdateMarqueComponent, {
      width: "330px",
      data: {
        dataKey: marque,
      },
    });
  }
}
