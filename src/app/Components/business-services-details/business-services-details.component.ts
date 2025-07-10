import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessService } from 'src/app/services/businesServices/business.service';

@Component({
  selector: 'app-business-services-details',
  templateUrl: './business-services-details.component.html',
  styleUrls: ['./business-services-details.component.scss']
})

export class BusinessServicesDetailsComponent implements OnInit {
  loading: boolean = true;
  service: any | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private businessService: BusinessService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadServiceDetails(id);
      } else {
        this.loading = false;
      }
    });
  }

  private loadServiceDetails(id: string): void {
    this.loading = true;
    // Convert string ID to number if needed, or update the service to accept string IDs
    const serviceId = Number(id);
    
    this.businessService.getServiceById(serviceId).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.service = response.data;
        } else {
          this.service = null;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading service details:', error);
        this.service = null;
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/services']).then(() => {
      setTimeout(() => {
        const element = document.getElementById('services');
        if (element) {
          // Calculate position to center the element in the viewport
          const elementRect = element.getBoundingClientRect();
          const absoluteElementTop = elementRect.top + window.pageYOffset;
          const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
          window.scrollTo({
            top: middle,
            behavior: 'smooth'
          });
        } else {
          window.scrollTo(0, 0);
        }
      }, 100);
    });
  }
}

