import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './Content/news/news.component';
import { NewsDetailsComponent } from './Content/news-details/news-details.component';
import { BusinessServiceComponent } from './Content/business-service/business-service.component';
import { BusinessServiceDetailsComponent } from './Content/business-service-details/business-service-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { ContactComponent } from './Content/contact/contact.component';
import { MessageListComponent } from './Content/message-list/message-list.component';

const routes: Routes = [
  { 
    path: '', 
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, title: 'FIFOTech | Dashboard' },
      { 
        path: 'news-list', 
        children: [
          { path: '', component: NewsComponent, title: 'FIFOTech | New-List'  },
          { path: ':id', component: NewsDetailsComponent, title: 'FIFOTech | News-Details'  }
        ]
      },
      { 
        path: 'services-list',
        children: [
          { path: '', component: BusinessServiceComponent, title: 'FIFOTech | Services-List'  },
          { path: ':id', component: BusinessServiceDetailsComponent, title: 'FIFOTech | Services-Details'  }
        ]
      },
      { path: 'contacts', component: ContactComponent , title: 'FIFOTech | Address' },
      { path: 'messageList', component: MessageListComponent, title: 'FIFOTech | Message-List'  },
      { path: 'gallery', component: DashboardComponent , title: 'FIFOTech | Gallary-List' }, 
      { path: 'users', component: DashboardComponent , title: 'FIFOTech | User-List' }, 
      { path: 'settings', component: DashboardComponent , title: 'FIFOTech | Setting' }, 
      { path: '**', redirectTo: 'dashboard' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
