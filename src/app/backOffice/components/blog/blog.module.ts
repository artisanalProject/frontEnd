import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArticleComponent } from './create-article/create-article.component';
import { MenusRoutingModule } from '../menus/menus-routing.module';

import { GalleryModule } from "@ks89/angular-modal-gallery";
import { BlogRoutingModule } from './blog-routing.module';
import { DropzoneModule } from "ngx-dropzone-wrapper";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { NgxDropzoneModule } from "ngx-dropzone";
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule }   from '@angular/forms';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { MatIconModule } from "@angular/material/icon";
import { DetailsComponent } from './details/details.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [CreateArticleComponent, ArticlesListComponent, DetailsComponent, UpdateArticleComponent],
  imports: [
    CommonModule,
    MenusRoutingModule,
    GalleryModule.forRoot(),
    BlogRoutingModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule,
    NgxDropzoneModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule
  ],
})
export class BlogModule { }
