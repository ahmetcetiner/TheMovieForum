import { HomeGuard } from './guards/home.guard';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  
  HomepageComponent,
  ActorComponent,
  GalleryComponent,
  LoginComponent,
  SignUpComponent,
  CommentComponent,
  BreadCrumbComponent,
  MovieInfoComponent,
  ProfilePageComponent,
  ProfileEditPageComponent,
  DiscussionsComponent,
  DiscussionMessageComponent,
  MessageComponent,
  SearchComponent,
  PopularMovieComponent,
  ReviewsComponent
} from './pages';
import {
  ClientLayoutComponent,
  ClientBannerComponent,
  ClientFooterComponent
} from './components/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guards/auth.guard';
import { YtPlayerAngularModule } from 'yt-player-angular';
import { YouTubePlayerModule } from '@angular/youtube-player';

export function tokenGetter() {
  return localStorage.getItem('token');
}

export function idGetter() {
  return localStorage.getItem('ID');
}

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    GalleryComponent,
    ClientLayoutComponent,
    ClientBannerComponent,
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
    DiscussionMessageComponent,
    MessageComponent,
    SearchComponent,
    PopularMovieComponent,
  ],
  imports: [
    YtPlayerAngularModule,
    BrowserModule,
    NgxEditorModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    YouTubePlayerModule,  
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:4200'],
        disallowedRoutes: ['localhost:4200/profile/'],
      },
    }),
  ],
  providers: [AuthGuard,HomeGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
