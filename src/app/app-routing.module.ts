import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './Components/contact/contact.component';
import { AboutComponent } from './Components/about/about.component';
import { HomeComponent } from './Components/home/home.component';
import { CarrerComponent } from './Components/carrer/carrer.component';
import { BpoAllianceComponent } from './Components/bpo-alliance/bpo-alliance.component';
import { BpoAllianceDetailsComponent } from './Components/bpo-alliance-details/bpo-alliance-details.component';
import { NewsComponent } from './Components/news/news.component';
import { LoginComponent } from './Components/login/login.component';
import { BusinessServiceComponent } from './Components/business-service/business-service.component';
import { NewsDetailComponent } from './Components/news-detail/news-detail.component';
import { GalleryComponent } from './Components/gallery/gallery.component';
import { GalleryDetailsComponent } from './Components/gallery-details/gallery-details.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { BusinessServicesDetailsComponent } from './Components/business-services-details/business-services-details.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  // Main layout routes (with navbar and footer)
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent, title: 'FIFOTech | Home' },
      { path: 'login', component: LoginComponent, title: 'FIFOTech | Login' },
      { path: 'contact', component: ContactComponent, title: 'FIFOTech | Contact' },
      { path: 'about', component: AboutComponent, title: 'FIFOTech | About' },
      { path: 'career', component: CarrerComponent, title: 'FIFOTech | Career' },
      { path: 'news', component: NewsComponent, title: 'FIFOTech | News' },
      { path: 'news/:id', component: NewsDetailComponent, title: 'FIFOTech | News Detail' },
      { path: 'services', component: BusinessServiceComponent, title: 'FIFOTech | Services' },
      { path: 'services/:id', component: BusinessServicesDetailsComponent, title: 'FIFOTech | Service Details' },
      { path: 'bpo-alliance', component: BpoAllianceComponent, title: 'FIFOTech | BPO Alliance' },
      { path: 'bpo-alliance/:id', component: BpoAllianceDetailsComponent, title: 'FIFOTech | BPO Details' },
      { path: 'gallery', component: GalleryComponent, title: 'FIFOTech | Gallery' },
      { path: 'gallery/:id', component: GalleryDetailsComponent, title: 'FIFOTech | Gallery Details' },
    ]
  },

  // Admin module (no navbar/footer)
  {
    path: 'admin',
    canLoad: [AuthGuard], 
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },

  // Redirect all unknown paths to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
