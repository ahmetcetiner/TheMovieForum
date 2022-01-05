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
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
        data: { title: 'Hakkımızda' },
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
        data: { title: 'İletişim' },
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
      },{
        path: 'comment',
        component: CommentComponent,
        data: { title: 'Yorumlar' },
      },
      {
        path: 'movie/:movieId',
        component: MovieInfoComponent,
        data: { title: 'Movie' },
      },
      {
        path: 'profile',
        component: ProfilePageComponent,
        data: { title: 'Profile' },
      },
      {
        path: 'movie/:movieId/actors',
        component: ActorComponent,
        data: { title: 'Actors' },
      },
      {
        path: 'a',
        component: DiscussionMessageComponent,
        data: { title: 'Actors' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
