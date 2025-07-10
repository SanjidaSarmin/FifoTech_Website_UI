import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessService } from 'src/app/services/businesServices/business.service';

interface ServiceDetails {
  id: string;
  title: string;
  subtitle?: string;
  descriptionHeader?: string;
  description?: string;
  facilities?: string[];
  imageBase64?: string;
  createdAt?: string;
}

@Component({
  selector: 'app-business-service-details',
  templateUrl: './business-service-details.component.html',
  styleUrls: ['./business-service-details.component.scss']
})
export class BusinessServiceDetailsComponent implements OnInit {
  loading: boolean = true;
  service: ServiceDetails | null = null;

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
    this.router.navigate(['/admin/services-list']).then(() => {
      setTimeout(() => {
        const element = document.getElementById('services-grid');
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
      }, 100); // Small delay to ensure the page has rendered
    });
  }
}
