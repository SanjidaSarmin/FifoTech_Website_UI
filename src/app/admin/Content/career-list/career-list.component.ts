import { Component, OnInit } from '@angular/core';
import { CareerService } from 'src/app/services/career/career.service';

@Component({
  selector: 'app-career-list',
  templateUrl: './career-list.component.html',
  styleUrls: ['./career-list.component.scss']
})
export class CareerListComponent implements OnInit{
  careers: any = [];

  constructor(private careerService: CareerService) {}

  ngOnInit() {
    this.careerService.getAllCareers().subscribe(data => {
      this.careers = data;
    });
  }

  isAddCareerModalOpen = false;
  isEditCareerModalOpen = false;

  showDeleteModal = false;
  careerItemToDelete: number | null = null;

  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  showNotification: boolean = false;

  newCareer: any = {
    title: '',
    type: '',
    location: '',
    description: '',
    requirement: '',
    open: false,
  };

  editingCareer: any = {
    id: null,
    title: '',
    type: '',
    location: '',
    description: '',
    requirement: '',
    open: false,
  };

  openAddCareerModal() {
    this.isAddCareerModalOpen = true;
    this.newCareer = {
      title: '',
      type: '',
      location: '',
      description: '',
      requirement: '',
      open: false,
    };
  }

  closeAddCareerModal() {
    this.isAddCareerModalOpen = false;
  }

  submitAddCareer() {

    const careerToSend = {
      ...this.newCareer,
      requirement: this.newCareer.requirement.split(',').map((r: string) => r.trim())
    };

    this.careerService.createCareer(careerToSend).subscribe({
      next: (response) => {
        console.log('Career created successfully:', response);
        this.showNotificationMessage('Career created successfully', 'success')
        this.closeAddCareerModal();
        this.ngOnInit();
      },
      error: (err) => {
        console.error('Error creating career:', err);
        this.showNotificationMessage('Career creation failed', 'error')
      }
    });
  }
  


  openEditCareerModal(career: any) {
    this.isEditCareerModalOpen = true;
    this.editingCareer = {
      ...career,
      requirement: career.requirement.join(', '),
    };
  }

  closeEditCareerModal() {
    this.isEditCareerModalOpen = false;
  }

  submitEditCareer() {
    if (!this.editingCareer.id) {
      alert('No career selected for update!');
      return;
    }

    const updatedCareer = {
      ...this.editingCareer,
      requirement: this.editingCareer.requirement
        ? this.editingCareer.requirement.split(',').map((r: string) => r.trim())
        : []
    };
  
    this.careerService.updateCareer(this.editingCareer.id, updatedCareer).subscribe({
      next: () => {
        this.showNotificationMessage('Career updated successfully', 'success')
        this.closeEditCareerModal();
        this.ngOnInit();
      },
      error: (err) => {
        this.showNotificationMessage('Career update failed', 'error')
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

  openDeleteModal(id: number): void {
    this.careerItemToDelete = id;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.careerItemToDelete = null;
  }

  confirmDelete(): void {
    if (this.careerItemToDelete !== null) {
      this.careerService.deleteCareer(this.careerItemToDelete).subscribe({
        next: () => {
          this.ngOnInit()
          this.closeDeleteModal();
          this.showNotificationMessage('Career deleted successfully.','success');
        },
        error: (error) => {
          this.closeDeleteModal();
          this.showNotificationMessage('Failed to delete Career item.','error');
        }
      });
    }
  }

}
