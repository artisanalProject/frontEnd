import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { DashboardModule } from "./components/dashboard/dashboard.module";
import { SharedModule } from "./shared/shared.module";
import { ProductsModule } from "./components/products/products.module";
import { SalesModule } from "./components/sales/sales.module";
import { PagesModule } from "./components/pages/pages.module";
import { MediaModule } from "./components/media/media.module";
import { MenusModule } from "./components/menus/menus.module";
import { VendorsModule } from "./components/vendors/vendors.module";
import { UsersModule } from "./components/users/users.module";
import { LocalizationModule } from "./components/localization/localization.module";
import { InvoiceModule } from "./components/invoice/invoice.module";
import { SettingModule } from "./components/setting/setting.module";
import { ReportsModule } from "./components/reports/reports.module";
import { AuthModule } from "./components/auth/auth.module";
import { FileRenderComponentComponent } from "./file-render-component/file-render-component.component";
import { MatTableModule } from "@angular/material/table";
import { BlogModule } from "./components/blog/blog.module";
import { AuthGuard } from "./guard/auth.guard";


@NgModule({
  declarations: [AppComponent, FileRenderComponentComponent],
  imports: [
    MatTableModule,
    DashboardModule,
    InvoiceModule,
    SettingModule,
    ReportsModule,
    AuthModule,
    SharedModule,
    LocalizationModule,
    ProductsModule,
    SalesModule,
    VendorsModule,
    PagesModule,
    MediaModule,
    MenusModule,
    UsersModule,
    AppRoutingModule,
    BlogModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AdminModule {}
