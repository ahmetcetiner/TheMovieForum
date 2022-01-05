import { ReviewsComponent } from './pages/reviews/reviews.component';
import { ActorComponent } from './pages/actor/actor.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HomepageComponent,
  GalleryComponent,
  AboutUsComponent,
  LoginComponent,
  SignUpComponent,
} from './pages';
import {
  ClientLayoutComponent,
  ClientBannerComponent,
} from './components/layout';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ClientFooterComponent } from './components/layout/client-footer/client-footer.component';
import { CommentComponent } from './pages/comment/comment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadCrumbComponent } from './pages/bread-crumb/bread-crumb.component';
import { MovieInfoComponent } from './pages/movie-info/movie-info.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileEditPageComponent } from './pages/profile-edit-page/profile-edit-page.component';
import { DiscussionsComponent } from './pages/discussions/discussions.component';
import { NgxEditorModule } from 'ngx-editor';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guards/auth.guard';

export function tokenGetter() {
  return localStorage.getItem('token');
}

export function idGetter() {
  return localStorage.getItem('Id');
}

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
    MovieInfoComponent,
    ProfilePageComponent,
    ActorComponent,
    ProfileEditPageComponent,
    DiscussionsComponent,
    ReviewsComponent,
  ],
  imports: [
    BrowserModule,
    NgxEditorModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,    
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:4200'],
        disallowedRoutes: ['localhost:4200/profile/'],
      },
    }),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
