import { ActorComponent } from './pages/actor/actor.component';
import { NgModule } from '@angular/core';
import {
  HomepageComponent,
  LoginComponent,
  SignUpComponent,
  ProfilePageComponent,
  SearchComponent,
  MovieInfoComponent,
  DiscussionMessageComponent
} from './pages';
import { Routes, RouterModule } from '@angular/router';
import { ClientLayoutComponent } from './components';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { HomeGuard } from './guards/home.guard';

const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    data: { title: '' },
    children: [
      {
        path: '',
        component: HomepageComponent,
        data: { title: 'Home page' },
        canActivate:[HomeGuard]
      },
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login' },
        canActivate:[AuthGuard]
      },
      {
        path: 'signup',
        component: SignUpComponent,
        data: { title: 'Sign Up' },
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
        path: 'discussion/:movieId/:discussionId',
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
