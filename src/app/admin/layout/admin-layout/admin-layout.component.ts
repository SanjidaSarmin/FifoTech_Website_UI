import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { AdminFooterComponent } from '../admin-footer/admin-footer.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    RouterOutlet,
    AdminNavbarComponent,
    AdminFooterComponent
  ],
  template: `
    <div class="admin-layout">
      <app-admin-navbar></app-admin-navbar>
      <div class="main-content">
        <router-outlet></router-outlet>
      </div>
      <app-admin-footer></app-admin-footer>
    </div>
  `,
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent { }
