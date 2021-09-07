import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { content } from "./shared/routes/content-routes";
import { ContentLayoutComponent } from "./shared/layout/content-layout/content-layout.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { AuthGuard } from "./guard/auth.guard";

const routes: Routes = [ 
  {
    path: "admin",
    redirectTo: "dashboard/default",
    pathMatch: "full",
    canActivate:[AuthGuard]
  },
  {
    path: "",
    component: ContentLayoutComponent,
    children: content,
    canActivate:[AuthGuard]
  },
  
  {
    path: "auth/login",
    component: LoginComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
