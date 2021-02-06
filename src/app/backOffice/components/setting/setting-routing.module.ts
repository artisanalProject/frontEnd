import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { PendingRegistrationComponent } from './pending-registration/pending-registration.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { DetailRequestedProductComponent } from './detail-requested-product/detail-requested-product.component';


const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      title: "Profile",
    }
  },
  {
    path: 'pendingRegistration',
    component: PendingRegistrationComponent,
    data: {
      title: "En attente d'activation",
    }
  },
  {
    path: 'Notifications',
    component: NotificationsComponent,
    data: {
      title: "Notifications",
    }
  },
  {
    path: 'details-product/:id',
    component: DetailRequestedProductComponent,
    data: {
      title: "Product Details",
    }
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
