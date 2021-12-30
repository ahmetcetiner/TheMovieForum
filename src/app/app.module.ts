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
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { CommentComponent } from './pages/comment/comment.component';
import { FormsModule } from '@angular/forms';

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
    LoginComponent,
    SignUpComponent,
    CommentComponent,
  ],
  imports: [BrowserModule, AppRoutingModule,FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
