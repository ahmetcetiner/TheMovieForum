import { NgModule } from '@angular/core';
import {
  HomepageComponent,
  GalleryComponent,
  AboutUsComponent,
  ContactUsComponent,
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
