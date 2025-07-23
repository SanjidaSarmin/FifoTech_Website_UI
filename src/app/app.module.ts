import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CountUpModule } from 'ngx-countup';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './Components/contact/contact.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { AboutComponent } from './Components/about/about.component';
import { HomeComponent } from './Components/home/home.component';
import { CarrerComponent } from './Components/carrer/carrer.component';
import { ScrollIntoViewDirective } from './Directives/scroll-into-view.directive';
import { BpoAllianceComponent } from './Components/bpo-alliance/bpo-alliance.component';
import { BpoAllianceDetailsComponent } from './Components/bpo-alliance-details/bpo-alliance-details.component';
import { LoginComponent } from './Components/login/login.component';
import { BusinessServiceComponent } from './Components/business-service/business-service.component';
import { NewsDetailComponent } from './Components/news-detail/news-detail.component';
import { GalleryComponent } from './Components/gallery/gallery.component';
import { GalleryDetailsComponent } from './Components/gallery-details/gallery-details.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { BusinessServicesDetailsComponent } from './Components/business-services-details/business-services-details.component';
import { JobApplicationComponent } from './Components/job-application/job-application.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    AboutComponent,
    HomeComponent,
    CarrerComponent,
    ScrollIntoViewDirective,
    BpoAllianceComponent,
    BpoAllianceDetailsComponent,
    LoginComponent,
    BusinessServiceComponent,
    NewsDetailComponent,
    GalleryComponent,
    GalleryDetailsComponent,
    BusinessServicesDetailsComponent,
    JobApplicationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    CountUpModule,
    MainLayoutComponent,
    NavbarComponent,
    FooterComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
