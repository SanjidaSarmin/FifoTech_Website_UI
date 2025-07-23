import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface AdminPage {
  title: string;
  path: string;
  iconImage: string;
  description: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  adminPages: AdminPage[] = [
    {
      title: 'Business Services',
      path: '/admin/services-list',
      iconImage: 'assets/service.png',
      description: 'Manage your business services'
    },
    {
      title: 'News',
      path: '/admin/news-list',
      iconImage: 'assets/news.png',
      description: 'Manage news articles'
    },
    {
      title: 'Gallery',
      path: '/admin/gallary-list',
      iconImage: 'assets/gallary.png',
      description: 'Manage gallery items'
    },
    {
      title: 'Address',
      path: '/admin/contacts',
      iconImage: 'assets/location.png',
      description: 'Manage office info'
    },
    {
      title: 'Career',
      path: '/admin/career-list',
      iconImage: 'assets/carrer.png',
      description: 'Manage career post'
    },
    {
      title: 'Applicant List',
      path: '/admin/applicant-list',
      iconImage: 'assets/person.png',
      description: 'Manage user accounts'
    },
    {
      title: 'Message',
      path: '/admin/messageList',
      iconImage: 'assets/msg.png',
      description: 'View client messages'
    },
    {
      title: 'Settings',
      path: '/admin/settings',
      iconImage: 'assets/settings.png',
      description: 'Configure system settings'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Add any initialization logic here
  }
}
