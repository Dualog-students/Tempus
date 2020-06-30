import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DualogDesignSystemModule } from '@dualog/design-system';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavTogglerComponent } from './components/nav-toggler/nav-toggler.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginService } from './services/login.service';
import { SignupComponent } from './components/modals/signup/signup.component';
import { UserService } from './services/user.service';
import { ManageAdminPageComponent } from './pages/manage-admin-page/manage-admin-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { EditUserModalComponent } from './components/modals/edit-user-modal/edit-user-modal.component';
import { OverviewPageComponent } from './pages/overview-page/overview-page.component';
import { CompareHoursComponent } from './components/compare-hours/compare-hours.component';
import { GraphsComponent } from './graphs/graphs.component';
import { ChartsComponent } from './charts/charts.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NavbarComponent,
    NavTogglerComponent,
    LoginComponent,
    SignupComponent,
    ManageAdminPageComponent,
    ProfilePageComponent,
    EditUserModalComponent,
    OverviewPageComponent,
    CompareHoursComponent,
    GraphsComponent,
    ChartsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DualogDesignSystemModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [LoginService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
