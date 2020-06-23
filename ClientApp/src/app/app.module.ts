import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DualogDesignSystemModule } from '@dualog/design-system';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavTogglerComponent } from './components/nav-toggler/nav-toggler.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, NavTogglerComponent],
  imports: [BrowserModule, AppRoutingModule, DualogDesignSystemModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
