import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GalleryService } from 'src/app/services/gallery/gallery.service';

export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  dateAdded: Date;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  constructor(private router: Router,
    private galleryService: GalleryService) { }

  ngOnInit(): void {
    this.getAllGalleryItems(0, 'postDate', 'desc');
  }

  galleryItems: any[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 3;


  isLoading = true;
  errorMessage = '';
  
  getAllGalleryItems(page: number = 0, sortBy: string = 'postDate', direction: string = 'desc'): void {
    this.isLoading = true;
    this.galleryService.getGalleryItems(page, this.pageSize, sortBy, direction).subscribe({
      next: (response: any) => {
        this.galleryItems = response.content || [];
        this.totalPages = response.totalPages;
        this.currentPage = response.number;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Failed to fetch gallery items:', error);
        this.isLoading = false;
        this.errorMessage = 'Failed to fetch gallery items. Please try again later.';
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
    this.router.navigate(['/gallery', id]).then(() => {
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

}

