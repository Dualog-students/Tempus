import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ManageAdminPageComponent } from './pages/manage-admin-page/manage-admin-page.component';
import { OverviewPageComponent } from './pages/overview-page/overview-page.component';
import {
  IsLoggedInGuard,
  IsNotLoggedInGuard,
  IsAdminGuard,
} from './guards/authentication.guard';
import { DashboardComponent } from './pages/dashboard/dashboard-page.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [IsLoggedInGuard] },
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
    path: 'overview',
    component: OverviewPageComponent,
    canActivate: [IsLoggedInGuard],
  },
 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
