import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './physical/category/category.component';
import { SubCategoryComponent } from './physical/sub-category/sub-category.component';
import { ProductListComponent } from './physical/product-list/product-list.component';
import { AddProductComponent } from './physical/add-product/add-product.component';
import { DigitalCategoryComponent } from './digital/digital-category/digital-category.component';
import { DigitalSubCategoryComponent } from './digital/digital-sub-category/digital-sub-category.component';
import { DigitalListComponent } from './digital/digital-list/digital-list.component';
import { DigitalAddComponent } from './digital/digital-add/digital-add.component';
import { ProductDetailComponent } from './physical/product-detail/product-detail.component';
import { UpdateProductComponent } from './digital/update-product/update-product.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'physical/category',
        component: CategoryComponent,
        data: {
          title: "Category",
          breadcrumb: "Category"
        }
      },
      {
        path: 'physical/sub-category',
        component: SubCategoryComponent,
        data: {
          title: "Sub Category",
          breadcrumb: "Sub Category"
        }
      },
      {
        path: 'physical/product-list',
        component: ProductListComponent,
        data: {
          title: "Product List",
          breadcrumb: "Product List"
        }
      },
      {
        path: 'physical/product-detail',
        component: ProductDetailComponent,
        data: {
          title: "Product Detail",
          breadcrumb: "Product Detail"
        }
      },
      {
        path: 'physical/add-product',
        component: AddProductComponent,
        data: {
          title: "Ajouter Produit",
          breadcrumb: "Ajouter Produit"
        }
      },
      {
        path: 'digital/digital-category',
        component: DigitalCategoryComponent,
        data: {
          title: "Category",
          breadcrumb: "Category"
        }
      },
      {
        path: 'marque',
        component: DigitalSubCategoryComponent,
        data: {
          title: "Marque",
          breadcrumb: "Marque"
        }
      },
      {
        path: 'product-list',
        component: DigitalListComponent,
        data: {
          title: "Listes des produits",
          breadcrumb: "Listes des produits"
        }
      },
      {
        path: 'add-product',
        component: DigitalAddComponent,
        data: {
          title: "Ajouter Produit",
          breadcrumb: "Ajouter Produit"
        }
      },
      {
        path: 'update-product/:id',
        component: UpdateProductComponent,
        data: {
          title: "modifier Produit",
          breadcrumb: "modifier Produit"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
