import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { PendingRegistrationComponent } from './pending-registration/pending-registration.component';


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
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
