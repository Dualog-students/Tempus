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
import { DashboardComponent } from './pages/dashboard/dashboard-page.component';
import { RegisterHoursComponent } from './components/modals/register-hours/register-hours-modal.component';
import { ProjectDateSelectorComponent } from './components/project-date-selector/project-date-selector.component';
import { GridLoggerComponent } from './components/grid-logger/grid-logger.component';
import { LoggerDetailsComponent } from './components/logger-details/logger-details.component';
import { OverviewPageComponent } from './pages/overview-page/overview-page.component';
import { CompareHoursComponent } from './components/compare-hours/compare-hours.component';
import { ManagementPageComponent } from './pages/management-page/management-page.component';
import { ManageUserPageComponent } from './pages/manage-user-page/manage-user-page.component';
import {
  Date2WeekDayEU,
  Date2WeekDayUS,
  Date2String,
} from './utils/pipes/date.pipe';

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
    DashboardComponent,
    RegisterHoursComponent,
    ProjectDateSelectorComponent,
    GridLoggerComponent,
    LoggerDetailsComponent,
    OverviewPageComponent,
    CompareHoursComponent,
    ManagementPageComponent,
    ManageUserPageComponent,
    Date2WeekDayEU,
    Date2WeekDayUS,
    Date2String,
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
  providers: [
    LoginService,
    UserService,
    Date2WeekDayEU,
    Date2WeekDayUS,
    Date2String,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
