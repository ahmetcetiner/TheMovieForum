import { MovieComponent } from './pages/movie/movie.component';
import { HttpClientModule } from '@angular/common/http';
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
import { BreadCrumbComponent } from './pages/bread-crumb/bread-crumb.component';
import { MovieInfoComponent } from './pages/movie-info/movie-info.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

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
    BreadCrumbComponent,
    MovieComponent,
    MovieInfoComponent,
    ProfilePageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule,FormsModule,HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
