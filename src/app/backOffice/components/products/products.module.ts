import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Ng2SmartTableModule } from "ng2-smart-table";
import { CKEditorModule } from "ngx-ckeditor";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbActiveModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { ProductsRoutingModule } from "./products-routing.module";
import { DigitalCategoryComponent } from "./digital/digital-category/digital-category.component";
import { DigitalSubCategoryComponent } from "./digital/digital-sub-category/digital-sub-category.component";
import { DigitalListComponent } from "./digital/digital-list/digital-list.component";
import { DigitalAddComponent } from "./digital/digital-add/digital-add.component";
import { GalleryModule } from "@ks89/angular-modal-gallery";
import "hammerjs";
import "mousetrap";
import { DropzoneModule } from "ngx-dropzone-wrapper";
import { DROPZONE_CONFIG } from "ngx-dropzone-wrapper";
import { DropzoneConfigInterface } from "ngx-dropzone-wrapper";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatButtonModule } from "@angular/material/button";
import { DialogContentExampleDialogComponent } from "./digital/dialog-content-example-dialog/dialog-content-example-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { NgxDropzoneModule } from "ngx-dropzone";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { UpdateProductComponent } from "./digital/update-product/update-product.component";
import { ModalUpdateComponent } from "./digital/digital-category/modal-update/modal-update.component";
import { ModalUpdateMarqueComponent } from "./digital/digital-category/modal-update-marque/modal-update-marque.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { AddProductArtisanComponent } from "./digital/add-product-artisan/add-product-artisan.component";
import { ArtisanPendingRequestsComponent } from "./digital/artisan-pending-requests/artisan-pending-requests.component";
import { UpdatePendingProductComponent } from "./digital/update-pending-product/update-pending-product.component";
import { ArtisanRefusedRequestsComponent } from "./digital/artisan-refused-requests/artisan-refused-requests.component";
import { ProductDetailsComponent } from "./digital/product-details/product-details.component";
import { ConfirmedProductsComponent } from './digital/confirmed-products/confirmed-products.component';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 50,
  url: "https://httpbin.org/post",
};

@NgModule({
  declarations: [
    DigitalCategoryComponent,
    DigitalSubCategoryComponent,
    DigitalListComponent,
    DigitalAddComponent,
    DialogContentExampleDialogComponent,
    UpdateProductComponent,
    ModalUpdateComponent,
    ModalUpdateMarqueComponent,
    AddProductArtisanComponent,
    ArtisanPendingRequestsComponent,
    UpdatePendingProductComponent,
    ArtisanRefusedRequestsComponent,
    ProductDetailsComponent,
    ConfirmedProductsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    ProductsRoutingModule,
    Ng2SmartTableModule,
    NgbModule,
    DropzoneModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatSelectModule,
    NgxDropzoneModule,
    MatSnackBarModule,
    MatGridListModule,
    MatCheckboxModule,
    GalleryModule.forRoot(),
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG,
    },
    NgbActiveModal,
  ],
  entryComponents: [DialogContentExampleDialogComponent],
})
export class ProductsModule {}
