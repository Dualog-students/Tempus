import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DualogDesignSystemModule } from '@dualog/design-system';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavTogglerComponent } from './components/nav-toggler/nav-toggler.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NavbarComponent,
    NavTogglerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DualogDesignSystemModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
