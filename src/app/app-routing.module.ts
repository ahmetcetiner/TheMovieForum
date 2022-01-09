import { ActorComponent } from './pages/actor/actor.component';
import { NgModule } from '@angular/core';
import {
  HomepageComponent,
  GalleryComponent,
  AboutUsComponent,
  ContactUsComponent,
  LoginComponent,
  SignUpComponent,
  CommentComponent,
} from './pages';
import { Routes, RouterModule } from '@angular/router';
import { ClientLayoutComponent } from './components';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { MovieInfoComponent } from './pages/movie-info/movie-info.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { DiscussionMessageComponent } from './pages/discussion-message/discussion-message.component';
import { HomeGuard } from './guards/home.guard';
import { SearchComponent } from './pages/search/search.component';


const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    data: { title: '' },
    children: [
      {
        path: 'products',
        component: GalleryComponent,
        data: { title: 'Ürünler' },
      },
      {
        path: '',
        component: HomepageComponent,
        data: { title: 'Anasayfa' },
        canActivate:[HomeGuard]
      },
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Giriş' },
        canActivate:[AuthGuard]
      },
      {
        path: 'signup',
        component: SignUpComponent,
        data: { title: 'Kayıt Ol' },
        canActivate:[AuthGuard]
      },
      {
        path: 'movie/:movieId',
        component: MovieInfoComponent,
        data: { title: 'Movie' },
        canActivate:[HomeGuard]
      },
      {
        path: 'profile/:userId',
        component: ProfilePageComponent,
        data: { title: 'Profile' },
        canActivate:[HomeGuard]
      },
      {
        path: 'movie/:movieId/actors',
        component: ActorComponent,
        data: { title: 'Actors' },
      },
      {
        path: 'discussion/:movieId',
        component: DiscussionMessageComponent,
        data: { title: 'Discussion' },
      },
      {
        path: 'search/:serchText',
        component: SearchComponent,
        data: { title: 'Search' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
