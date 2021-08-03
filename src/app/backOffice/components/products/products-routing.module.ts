import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DigitalCategoryComponent } from "./digital/digital-category/digital-category.component";
import { DigitalSubCategoryComponent } from "./digital/digital-sub-category/digital-sub-category.component";
import { DigitalListComponent } from "./digital/digital-list/digital-list.component";
import { DigitalAddComponent } from "./digital/digital-add/digital-add.component";
import { UpdateProductComponent } from "./digital/update-product/update-product.component";
import { AddProductArtisanComponent } from "./digital/add-product-artisan/add-product-artisan.component";
import { ArtisanPendingRequestsComponent } from "./digital/artisan-pending-requests/artisan-pending-requests.component";
import { UpdatePendingProductComponent } from "./digital/update-pending-product/update-pending-product.component";
import { ArtisanRefusedRequestsComponent } from "./digital/artisan-refused-requests/artisan-refused-requests.component";
import { ProductDetailsComponent } from "./digital/product-details/product-details.component";
const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "category",
        component: DigitalCategoryComponent,
        data: {
          title: "Category",
          breadcrumb: "Category",
        },
      },
      {
        path: "add-request-product",
        component: AddProductArtisanComponent,
        data: {
          title: "Demande d'ajout d'un produit",
          breadcrumb: "New Product",
        },
      },
      {
        path: "marque",
        component: DigitalSubCategoryComponent,
        data: {
          title: "Marque",
          breadcrumb: "Marque",
        },
      },
      {
        path: "product-list",
        component: DigitalListComponent,
        data: {
          title: "Listes des produits",
          breadcrumb: "Listes des produits",
        },
      },
      {
        path: "pending-products",
        component: ArtisanPendingRequestsComponent,
        data: {
          title: "Listes des produits en attente de confirmation",
          breadcrumb: "Listes des produits",
        },
      },

      {
        path: "add-product",
        component: DigitalAddComponent,
        data: {
          title: "Ajouter Produit",
          breadcrumb: "Ajouter Produit",
        },
      },
      {
        path: "update-product/:id",
        component: UpdateProductComponent,
        data: {
          title: "modifier Produit",
          breadcrumb: "modifier Produit",
        },
      },
      {
        path: "product-details/:id",
        component: ProductDetailsComponent,
        data: {
          title: "product details",
          breadcrumb: "product details",
        },
      },
      {
        path: "update-pending-product/:id",
        component: UpdatePendingProductComponent,
        data: {
          title: "modifier Produit",
          breadcrumb: "modifier Produit",
        },
      },
      {
        path: "refused-requests-product",
        component: ArtisanRefusedRequestsComponent,
        data: {
          title: "Produits réfusés ",
          breadcrumb: "modifier Produit",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
