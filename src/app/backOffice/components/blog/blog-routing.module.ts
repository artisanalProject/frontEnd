import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesListComponent } from './articles-list/articles-list.component';

import { CreateArticleComponent } from './create-article/create-article.component';
import { DetailsComponent } from './details/details.component';


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
     

    {
      path: 'listAticle',
       component: ArticlesListComponent,

    },
    {
      path: 'detail-article/:id',
      component: DetailsComponent
    }
   ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule { }
