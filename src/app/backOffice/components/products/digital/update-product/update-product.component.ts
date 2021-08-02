import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Artisant } from "src/app/models/artisant";
import { Category } from "src/app/models/category";
// import { Collections } from 'src/app/models/collections';
import { Marque } from "src/app/models/marque";
import { Product } from "src/app/models/product";
import { ArtisantService } from "src/app/shared/services/artisant.service";
import { CategoryService } from "src/app/shared/services/category.service";
// import { CollectionService } from 'src/app/shared/services/collection.service';
import { MarqueService } from "src/app/shared/services/marque.service";
import { ProductService } from "src/app/shared/services/product.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-update-product",
  templateUrl: "./update-product.component.html",
  styleUrls: ["./update-product.component.scss"],
})
export class UpdateProductComponent implements OnInit {
  files: File[] = [];
  product_id: string;
  product: any;
  productForm: FormGroup;
  categorie: Category;
  categories: any = [];
  marque: Marque;
  marques = [];
  artisant: Artisant;
  artisantList = [];
  Oldimages = [];
  formData: FormData = new FormData();
  //  collection:Collections;
  //  collections= []
  showMarque: boolean = true;
  responseUpdate;
  constructor(
    private route: ActivatedRoute,
    private ps: ProductService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private cs: CategoryService,
    private ms: MarqueService,
    private as: ArtisantService,
    private router: Router //  private collectionService: CollectionService,
  ) {}

  ngOnInit(): void {
    console.log("hello there");

    this.getArtisant();
    this.getCategories();
    // this.getCollections()
    this.product_id = this.route.snapshot.params.id;
    console.log(this.product_id);

    this.ps.getProductById(this.product_id).subscribe(
      (res) => {
        this.product = JSON.parse(JSON.stringify(res));
      },
      (err) => {},
      () => {
        console.log(this.product);

        this.categorie = this.product.category;

        this.createProductForm();
      }
    );
  }
  show(e) {
    if (e) {
      this.showMarque = false;

      this.ms.getMarqueByCategoryId(e).subscribe(
        (res) => {
          this.marques = JSON.parse(JSON.stringify(res));
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  getArtisant() {
    this.as.getArtisant().subscribe((res) => {
      this.artisantList = JSON.parse(JSON.stringify(res));
    });
  }
  //  getCollections(){
  //    this.collectionService.getCollection().subscribe(result=>{
  // this.collections= JSON.parse(JSON.stringify(result))
  //    })
  //  }
  getCategories() {
    this.cs.getCategories().subscribe(
      (result) => {
        result.forEach((element) => {
          this.categories.push(JSON.parse(JSON.stringify(element)));
        });
      },
      (err) => {},
      () => {
        this.categories.forEach((element) => {
          element.marque.forEach((marque) => {
            this.marques.push(marque);
          });
        });
      }
    );
  }
  createProductForm() {
    this.productForm = new FormGroup({
      name: new FormControl(this.product.name),
      price: new FormControl(this.product.price),
      remise: new FormControl(this.product.remise),
      reference: new FormControl(this.product.ref),
      quantity: new FormControl(this.product.stock),
      category: new FormControl(this.product.category),
      marque: new FormControl(this.product.marque),
      // collections: new FormControl(this.product.collections),
      artisant: new FormControl(this.product.artisant),
    });

    this.Oldimages = this.product.images;
  }
  updateProduct() {
    var data = this.productForm.getRawValue();
    this.formData.set("name", data.name);
    this.formData.set("prix", data.price);
    this.formData.set("reference", data.reference);
    this.formData.set("category", data.category);
    this.formData.set("artisan", data.artisan);
    this.formData.set("quantity", data.quantity);
    this.formData.set("marque", data.marque);
    this.formData.set("description", data.description);
    this.formData.set("remise", data.remise);
    this.formData.set("oldImages", JSON.stringify(this.Oldimages));
    let images = [];
    this.files.forEach((element) => {
      images.push(element);
    });
    //  this.Oldimages.forEach(element => {
    //   images.push(element)
    //  });
    let fileCount = this.files.length;
    if (fileCount > 0) {
      for (let i = 0; i < fileCount; i++) {
        this.formData.append("images", images[i]);
      }
    }

    console.log(this.formData);
    this.ps
      .updateProduct(this.route.snapshot.params.id, this.formData)
      .subscribe(
        (res) => {
          this.responseUpdate = res;
        },
        (err) => {},
        () => {
          if (this.responseUpdate.message == "updated") {
            this._snackBar.open("Produit modifié avec succès", "OK", {
              verticalPosition: "top",
              duration: 2000,
            });
            // // Change the location with new one
            this.router.navigateByUrl("/products/product-list");
          } else {
            this._snackBar.open("Réessayez", "OK", {
              verticalPosition: "top",
              duration: 2000,
            });
          }
        }
      );
  }
  close(i) {
    const index = this.Oldimages.indexOf(i);
    this.Oldimages.splice(index, 1);
  }
  onSelect(event) {
    this.files.push(...event.addedFiles);
    console.log(this.files);
  }
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
