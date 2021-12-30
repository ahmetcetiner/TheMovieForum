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
      },
      {
        path: 'signup',
        component: SignUpComponent,
        data: { title: 'Kayıt Ol' },
      },{
        path: 'comment',
        component: CommentComponent,
        data: { title: 'Yorumlar' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
