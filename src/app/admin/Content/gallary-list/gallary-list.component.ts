import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { GalleryItem } from 'src/app/Components/gallery/gallery.component';
import { GalleryService } from 'src/app/services/gallery/gallery.service';


@Component({
  selector: 'app-gallary-list',
  templateUrl: './gallary-list.component.html',
  styleUrls: ['./gallary-list.component.scss']
})
export class GallaryListComponent implements OnInit {
  constructor(private router: Router,
    private galleryService: GalleryService) { }

  ngOnInit(): void {
    this.getAllGalleryItems();
    this.addImage();
  }

  galleryItems: any[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  isLoading: boolean = false;

  errorMessage = '';
  isModalOpen = false;
  isEditModalOpen = false;
  showModal = false;
  showEditModal = false;

  thumbnailFile: File | null = null;
  thumbnailPreview: string | null = null;
  galleryFiles: File[] = [];
  galleryImagePreviews: string[] = [];

  

  isGalleryModalOpen = false;
  showGalleryModal = false;
  isEditGalleryModalOpen = false;
  showEditGalleryModal = false;

  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  showNotification: boolean = false;

  showDeleteModal = false;
  galleryItemToDelete: number | null = null;


  getAllGalleryItems(page: number = 0): void {
    this.isLoading = true;
    this.galleryService.getGalleryItems(page, this.pageSize).subscribe({
      next: (response) => {
        this.galleryItems = response.content || [];
        this.totalPages = response.totalPages;
        this.currentPage = response.number;  // IMPORTANT: use response.number not page param
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to fetch gallery items:', error);
        this.isLoading = false;
      }
    });
  }


  openAddModal(): void {
    this.isGalleryModalOpen = true;
    setTimeout(() => this.showGalleryModal = true, 10);
  }

  closeAddModal(): void {
    this.isGalleryModalOpen = false;
    this.newGallery = { title: '', category: '' };
    this.thumbnailFile = null;
    this.galleryFiles = [];
    this.thumbnailPreview = null;
    this.galleryImagePreviews = [];
  }

  newGallery: any = {
    title: '',
    subtitle: '',
    postDate: '',
    images: []
  };

  addImage(): void {
    this.newGallery.images.push({
      file: null,
      previewUrl: ''
    });
  }

  removeImage(index: number): void {
    this.newGallery.images.splice(index, 1);
  }

  onFileSelected(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newGallery.images[index].file = file;
        this.newGallery.images[index].previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }


  onThumbnailSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.thumbnailFile = input.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.thumbnailPreview = e.target.result;
      };
      reader.readAsDataURL(this.thumbnailFile);
    }
  }

  submitGallery(): void {
    const formData = new FormData();

    formData.append('title', this.newGallery.title);
    formData.append('subtitle', this.newGallery.subtitle);
    formData.append('postDate', this.newGallery.postDate);

    // ✅ Append thumbnail
    if (this.thumbnailFile) {
      formData.append('thumbnailImage', this.thumbnailFile);
    }

    // ✅ Append all selected gallery images
    this.newGallery.images.forEach((img: any) => {
      if (img.file) {
        formData.append('images', img.file);
      }
    });

    this.isLoading = true;

    this.galleryService.createGalleryItem(formData).subscribe({
      next: (res) => {
        console.log('Gallery created successfully', res);
        this.showNotificationMessage('Gallery created successfully', 'success');
        this.closeAddModal();  // Reset modal/form
        this.getAllGalleryItems(); // Refresh gallery list
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Gallery creation failed:', err);
        this.showNotificationMessage('Gallery creation failed', 'error');
        this.isLoading = false;
      }
    });
  }

  editingGallery: any = {
    id: null,
    title: '',
    subtitle: '',
    postDate: '',
    thumbnailPreview: '',
    images: []
  };

  editThumbnailFile: File | null = null;
  editGalleryFiles: File[] = [];

  openEditModal(gallery: any): void {
    this.initializeEditingGallery(gallery);
    this.isEditGalleryModalOpen = true;
    setTimeout(() => {
      this.showEditGalleryModal = true;
    }, 10);
  }

  initializeEditingGallery(gallery: any) {
    this.editingGallery = {
      id: gallery.id,
      title: gallery.title,
      subtitle: gallery.subtitle || '',
      postDate: gallery.postDate || '',
      thumbnailPreview: gallery.thumbnailImageBase64
        ? `data:image/png;base64,${gallery.thumbnailImageBase64}`
        : '',
      images: gallery.imagesBase64
        ? gallery.imagesBase64.map((imgBase64: string) => ({
          file: null,
          previewUrl: imgBase64.startsWith('data:image')
            ? imgBase64
            : `data:image/png;base64,${imgBase64}`
        }))
        : []
    };
    this.editThumbnailFile = null;
    setTimeout(() => {
      this.showEditGalleryModal = true;
    }, 10);
  }

  closeEditModal(): void {
    this.showEditGalleryModal = false;
    setTimeout(() => {
      this.isEditGalleryModalOpen = false;
      this.editingGallery = {
        id: null,
        title: '',
        category: '',
        postDate: '',
        thumbnailPreview: '',
        images: []
      };
      this.editThumbnailFile = null;
      this.editGalleryFiles = [];
    }, 300);
  }

  onEditThumbnailSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.editThumbnailFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.editingGallery.thumbnailPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onEditImageSelected(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.editingGallery.images[index] = {
          file: file,
          previewUrl: e.target.result
        };
      };
      reader.readAsDataURL(file);
    }
  }

  onEditImagesSelected(event: any): void {
    const files = Array.from(event.target.files) as File[];
    this.editGalleryFiles = files;
    this.editingGallery.images = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.editingGallery.images.push({
          file: file,
          previewUrl: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    });
  }

  addEditImage(): void {
    this.editingGallery.images.push({ file: null, previewUrl: '' });
  }

  // Remove an image from the edit form
  removeEditImage(index: number): void {
    this.editingGallery.images.splice(index, 1);
  }

  submitEditGallery(): void {
    const formData = new FormData();

    // Append individual form fields as strings (no JSON blob)
    formData.append('title', this.editingGallery.title);
    formData.append('subtitle', this.editingGallery.subtitle);
    formData.append('postDate', this.editingGallery.postDate);

    // Append thumbnail image file with exact param name 'thumbnailImage'
    if (this.editThumbnailFile) {
      formData.append('thumbnailImage', this.editThumbnailFile);
    }

    // Append gallery images files with param name 'images'
    this.editingGallery.images.forEach((item: any) => {
      if (item.file) {
        formData.append('images', item.file);
      }
    });

    this.isLoading = true;

    this.galleryService.updateGalleryItem(this.editingGallery.id, formData).subscribe({
      next: res => {
        console.log('Gallery item updated:', res);
        this.showNotificationMessage('Gallery Updated successfully', 'success');
        this.closeEditModal();
        this.getAllGalleryItems();
        this.isLoading = false;
      },
      error: err => {
        console.error('Error updating gallery item:', err);
        this.showNotificationMessage('Gallery Update failed', 'error');
        this.isLoading = false;
      }
    });
  }


  currentItem: GalleryItem | null = null;
  lightboxActive = false;
  activeFilter = 'all';


  openLightbox(item: GalleryItem) {
    this.currentItem = item;
    this.lightboxActive = true;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightboxActive = false;
    this.currentItem = null;
    document.body.style.overflow = '';
  }

  // Close lightbox when clicking outside the content
  onLightboxClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('lightbox')) {
      this.closeLightbox();
    }
  }

  navigateToGallary(id: number) {
    this.router.navigate(['/admin/gallary-list', id]).then(() => {
      window.scrollTo(0, 0);
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.getAllGalleryItems(page);
    }
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  prevPage(): void {
    this.goToPage(this.currentPage - 1);
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
    this.galleryItemToDelete = id;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.galleryItemToDelete = null;
  }

  confirmDelete(): void {
    if (this.galleryItemToDelete !== null) {
      this.galleryService.deleteGalleryItem(this.galleryItemToDelete).subscribe({
        next: () => {
          this.getAllGalleryItems(this.currentPage);
          this.closeDeleteModal();
          this.showNotificationMessage('Gallery item deleted successfully.','success');
        },
        error: (error) => {
          console.error('Error deleting news:', error);
          this.closeDeleteModal();
          this.showNotificationMessage('Failed to delete gallery item.','error');
        }
      });
    }
  }

}
