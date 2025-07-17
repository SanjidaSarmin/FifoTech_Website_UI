import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Routing
import { AdminRoutingModule } from './admin-routing.module';

// Layout Components (standalone)
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AdminNavbarComponent } from './layout/admin-navbar/admin-navbar.component';
import { AdminFooterComponent } from './layout/admin-footer/admin-footer.component';

// Page Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewsComponent } from './Content/news/news.component';
import { NewsDetailsComponent } from './Content/news-details/news-details.component';
import { BusinessServiceComponent } from './Content/business-service/business-service.component';
import { BusinessServiceDetailsComponent } from './Content/business-service-details/business-service-details.component';
import { ContactComponent } from './Content/contact/contact.component';
import { MessageListComponent } from './Content/message-list/message-list.component';
import { GallaryListComponent } from './Content/gallary-list/gallary-list.component';
import { GallaryDetailsComponent } from './Content/gallary-details/gallary-details.component';
import { CareerListComponent } from './Content/career-list/career-list.component';

// Shared Components
// TODO: Add any shared components here

@NgModule({
  declarations: [
    // Page Components (non-standalone)
    DashboardComponent,
    NewsComponent,
    NewsDetailsComponent,
    BusinessServiceComponent,
    BusinessServiceDetailsComponent,
    ContactComponent,
    MessageListComponent,
    GallaryListComponent,
    GallaryDetailsComponent,
    CareerListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    // Standalone Components
    AdminLayoutComponent,
    AdminNavbarComponent,
    AdminFooterComponent,

    AdminRoutingModule
  ]
})
export class AdminModule { }
