import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateArticleComponent } from './create-article/create-article.component';


const routes: Routes = [
 {
   path:"",
   children: [
    {
      path: 'createAticle',
       component: CreateArticleComponent,
      data: {
        title: "blog",
        breadcrumb: "blog"
      }
    },
   ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
