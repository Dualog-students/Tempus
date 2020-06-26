import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ManageAdminPageComponent } from './pages/manage-admin-page/manage-admin-page.component';
import {
  IsLoggedInGuard,
  IsNotLoggedInGuard,
  IsAdminGuard,
} from './guards/authentication.guard';

const routes: Routes = [
  // TODO: Create home page
  { path: '', component: NotFoundComponent, canActivate: [IsLoggedInGuard] },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsNotLoggedInGuard],
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'manage-admin',
    component: ManageAdminPageComponent,
    canActivate: [IsAdminGuard],
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
