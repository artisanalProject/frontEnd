import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BagsComponent } from './bags/bags.component';


const routes: Routes = [
 
  {
    path: '',
    component: BagsComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
