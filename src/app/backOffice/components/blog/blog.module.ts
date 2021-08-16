import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArticleComponent } from './create-article/create-article.component';
import { MenusRoutingModule } from '../menus/menus-routing.module';




@NgModule({
  declarations: [CreateArticleComponent],
  imports: [
    CommonModule,
    MenusRoutingModule
  ]
})
export class BlogModule { }
