import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessService } from 'src/app/services/businesServices/business.service';

@Component({
  selector: 'app-business-service',
  templateUrl: './business-service.component.html',
  styleUrls: ['./business-service.component.scss']
})
export class BusinessServiceComponent implements OnInit{

  constructor(
    private businessService: BusinessService,
    private router: Router
  ) {}

  services: any[] = [];
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  totalItems: number = 0;

  isLoading = false;
  errorMessage = '';


  ngOnInit(): void {
    this.fetchServices();
  }

  navigateToService(id: number): void {
    this.router.navigate(['/services', id]).then(() => {
      window.scrollTo(0, 0);
    });
  }

  fetchServices(page: number = 0): void {
    this.businessService.getAllService(page).subscribe({
      next: (res) => {
        this.services = res.data.content; // ✅ FIXED HERE
        this.totalPages = res.data.totalPages;
        this.currentPage = page;
        console.log(this.services); // ✅ will now log the correct list
      },
      error: (err) => {
        console.error('Failed to load services', err);
      }
    });
  }

 
  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.fetchServices(page);
    }
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  prevPage(): void {
    this.goToPage(this.currentPage - 1);
  }


  servicesList = [
    {
      title: 'Contact Center Services',
      description: 'Contact Center Services are an excellent way to [...]',
      image: 'assets/call_center.jpg'
    },
    {
      title: 'Back-Office Services',
      description: 'FIFOTech believes that Back-Office Services are a vital [...]',
      image: 'assets/back-office.jpg'
    },
    {
      title: 'Digital Marketing',
      description: 'FIFOTech Digital Marketing Services will help your business [...]',
      image: 'assets/degital_marketing.jfif'
    },
    {
      title: 'Creative Design Services',
      description: 'FIFOTech Creative Design Services are highly effective & [...]',
      image: 'assets/learn.jpg'
    },
    {
      title: 'Application Design & Development',
      description: 'FIFOTech develops static and dynamic applications. Our in-house [...]',
      image: 'assets/app.jpg'
    },
    {
      title: 'Skills Development',
      description: 'FIFOTech imparts world-class training ranging from basic to [...]',
      image: 'assets/skills.jpg'
    }
  ];
}