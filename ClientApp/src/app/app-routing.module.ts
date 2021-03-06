import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ManageAdminPageComponent } from './pages/manage-admin-page/manage-admin-page.component';
import { ManagementPageComponent } from './pages/management-page/management-page.component';
import { ManageUserPageComponent } from './pages/manage-user-page/manage-user-page.component';
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
  {
    path: 'manage-admin',
    component: ManageAdminPageComponent,
    canActivate: [IsAdminGuard],
  },
  {
    path: 'management',
    component: ManagementPageComponent,
    canActivate: [IsAdminGuard],
  },
  {
    path: 'manage-user/:id',
    component: ManageUserPageComponent,
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
