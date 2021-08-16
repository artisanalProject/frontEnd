import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArticleComponent } from './create-article/create-article.component';
import { MenusRoutingModule } from '../menus/menus-routing.module';

import { GalleryModule } from "@ks89/angular-modal-gallery";
import { BlogRoutingModule } from './blog-routing.module';



@NgModule({
  declarations: [CreateArticleComponent],
  imports: [
    CommonModule,
    MenusRoutingModule,
    GalleryModule.forRoot(),
    BlogRoutingModule
  ]
})
export class BlogModule { }
