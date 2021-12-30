
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent, GalleryComponent, AboutUsComponent } from './pages';
import {
  ClientLayoutComponent,
  ClientBannerComponent,
} from './components/layout';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ClientFooterComponent } from './components/layout/client-footer/client-footer.component';
import { BreadCrumbComponent } from './pages/bread-crumb/bread-crumb.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    GalleryComponent,
    AboutUsComponent,
    ClientLayoutComponent,
    ClientBannerComponent,
    ContactUsComponent,
    ClientFooterComponent,
    BreadCrumbComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
