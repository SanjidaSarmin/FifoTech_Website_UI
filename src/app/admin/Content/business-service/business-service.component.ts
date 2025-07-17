import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BusinessService } from 'src/app/services/businesServices/business.service';

@Component({
  selector: 'app-business-service',
  templateUrl: './business-service.component.html',
  styleUrls: ['./business-service.component.scss']
})
export class BusinessServiceComponent implements OnInit{
  @ViewChild('editServiceForm') editServiceForm!: NgForm;

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
  isModalOpen = false;
  isEditModalOpen = false;
  showModal = false;
  showEditModal = false;

  showDeleteModal = false;
  serviceItemToDelete: number | null = null;

  selectedImageFile: File | null = null;
  selectedEditImage: File | null = null;

  facilitiesInput: string = '';
  previewUrl: string | null = null;

  searchTerm: string = ''; 
  searchPage: number = 0;

  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  showNotification: boolean = false;
  

  newService: any = {
    title: '',
    subtitle: '',
    descriptionHeader: '',
    facilities: [],
    image: null
  };

  editingService: any = {
    id: null,
    title: '',
    subtitle: '',
    descriptionHeader: '',
    facilities: [],
    image: null
  };

  navigateToServices(id: number) {
    this.router.navigate(['/admin/services-list', id]).then(() => {
      window.scrollTo(0, 0);
    });
  }

  openModal(): void {
    this.isModalOpen = true;
    setTimeout(() => {
      this.showModal = true;
    }, 10);
    this.resetForm();
  }

  closeModal(): void {
    this.showModal = false;
    setTimeout(() => {
      this.isModalOpen = false;
    }, 300);
  }

  closeEditModal(): void {
    this.showEditModal = false;
    setTimeout(() => {
      this.isEditModalOpen = false;
      this.editingService = {
        id: null,
        title: '',
        description: '',
        imagePreview: null
      };
      this.selectedEditImage = null;
    }, 300);
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
  
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  resetForm(): void {
    this.newService = {
      title: '',
      subtitle: '',
      descriptionHeader: '',
      facilities: [],
      image: null
    };
    this.facilitiesInput = '';
    this.previewUrl = null;
  }

  ngOnInit(): void {
    this.fetchServices();
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

  onEditImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedEditImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.editingService.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  
  onEditSubmit(): void {
    if (this.editServiceForm && this.editServiceForm.invalid) {
      Object.keys(this.editServiceForm.controls).forEach(key => {
        this.editServiceForm.controls[key].markAsTouched();
      });
      return;
    }
  
    if (this.editingService) {
      const formData = new FormData();
  
      // Create the data JSON
      const dataToSend = {
        title: this.editingService.title,
        subtitle: this.editingService.subtitle || '',
        descriptionHeader: this.editingService.descriptionHeader || '',
        facilities: Array.isArray(this.editingService.facilities)
          ? this.editingService.facilities
          : this.editingService.facilities?.split(',') || []
      };
  
      // Append 'data' part as JSON blob
      formData.append(
        'data',
        new Blob([JSON.stringify(dataToSend)], { type: 'application/json' })
      );
  
      if (this.selectedEditImage) {
        formData.append('image', this.selectedEditImage);
      }
  
      this.isLoading = true;
      this.businessService.updateService(this.editingService.id, formData).subscribe({
        next: (response) => {
          console.log('Service updated successfully', response);
          this.showNotificationMessage('Service Updated successfully', 'success');
          this.closeEditModal();
          this.fetchServices(this.currentPage);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error updating service', error);
          this.showNotificationMessage('Service Update failed', 'error');
          this.isLoading = false;
        }
      });
    }
  }
  
  openEditModal(service: any): void {
    this.editingService = {
      id: service.id,
      title: service.title,
      subtitle: service.subtitle || '',
      descriptionHeader: service.descriptionHeader || '',
      facilities: service.facilities || [],
      imagePreview: service.imageBase64 || null
    };
    
    this.isEditModalOpen = true;
    setTimeout(() => {
      this.showEditModal = true;
    }, 10);
  }
  
  submitService(): void {
    const formData = new FormData();
    const serviceData = {
      title: this.newService.title,
      subtitle: this.newService.subtitle,
      descriptionHeader: this.newService.descriptionHeader,
      facilities: this.facilitiesInput
        .split(',')
        .map(f => f.trim())
        .filter(f => f.length > 0),
      image: null 
    };
  
    formData.append('data', JSON.stringify(serviceData));
  
    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }
  
    this.businessService.uploadService(formData).subscribe({
      next: (res) => {
        this.showNotificationMessage('Service created successfully', 'success');
        console.log('Service added successfully:', res);
        this.resetForm();
        this.closeModal();
        this.fetchServices(); // refresh the list
      },
      error: (err) => {
        console.error('Service creation failed:', err);
        console.error('Error adding service:', err);
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

  openDeleteModal(id: number): void {
    this.serviceItemToDelete = id;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.serviceItemToDelete = null;
  }

  confirmDelete(): void {
    if (this.serviceItemToDelete !== null) {
      this.businessService.deleteService(this.serviceItemToDelete).subscribe({
        next: () => {
          this.fetchServices(this.currentPage);
          this.closeDeleteModal();
          this.showNotificationMessage('Service item deleted successfully.','success');
        },
        error: (error) => {
          console.error('Error deleting news:', error);
          this.closeDeleteModal();
          this.showNotificationMessage('Failed to delete service item.','error');
        }
      });
    }
  }
  
  searchServices(): void {
    const trimmed = this.searchTerm.trim();
    if (!trimmed) {
      this.fetchServices();
      return;
    }
  
    this.businessService.searchService(trimmed).subscribe({
      next: (res) => {
        this.services = res.data.content;
        this.totalPages = res.data.totalPages;
        this.currentPage = 0;
      },
      error: (err) => {
        console.error('Search failed', err);
      }
    });
  }
  
  showNotificationMessage(message: string, type: 'success' | 'error') {
    this.message = message;
    this.messageType = type;
    this.showNotification = true;
  
    setTimeout(() => {
      this.showNotification = false;
      this.message = '';
      this.messageType = '';
    }, 4000); // hides after 4 seconds
  }

}
  


