import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryService } from 'src/app/services/gallery/gallery.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

interface GalleryResponse {
  id: number;
  title: string;
  subtitle: string;
  postDate: string;
  thumbnailImageBase64: string;
  imagesBase64: string[];
}

@Component({
  selector: 'app-gallary-details',
  templateUrl: './gallary-details.component.html',
  styleUrls: ['./gallary-details.component.scss']
})
export class GallaryDetailsComponent implements OnInit {
  galleryItem: GalleryResponse = {
    id: 0,
    title: '',
    subtitle: '',
    postDate: '',
    thumbnailImageBase64: '',
    imagesBase64: []
  };

  isLoading = true;
  errorMessage = '';
  imagePairs: string[][] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private galleryService: GalleryService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.loadGalleryDetails(id);
      } else {
        this.errorMessage = 'Invalid gallery ID';
        this.isLoading = false;
      }
    });
  }

  loadGalleryDetails(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.galleryService.getGalleryItemById(id).pipe(
      catchError((error: any) => {
        console.error('Error loading gallery details:', error);
        this.errorMessage = 'Failed to load gallery details. Please try again later.';
        this.isLoading = false;
        return of(null);
      })
    ).subscribe((response: GalleryResponse | null) => {
      if (response) {
        this.galleryItem = {
          ...response,
          title: response.title || 'Untitled Gallery',
          subtitle: response.subtitle || '',
          postDate: response.postDate ? new Date(response.postDate).toISOString() : new Date().toISOString(),
          thumbnailImageBase64: response.thumbnailImageBase64 || '',
          imagesBase64: response.imagesBase64 || []
        };
        this.pairImages();
      }
      this.isLoading = false;
    });
  }

  // Helper method to convert array buffer to base64
  private arrayBufferToBase64(buffer: any): string {
    try {
      if (!buffer) return '';
      const bytes = buffer instanceof ArrayBuffer || buffer.buffer instanceof ArrayBuffer
        ? new Uint8Array(buffer instanceof ArrayBuffer ? buffer : buffer.buffer)
        : new Uint8Array(buffer);
      
      let binary = '';
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
    } catch (error) {
      console.error('Error converting array buffer to base64:', error);
      return '';
    }
  }

  // Group images into pairs for the grid layout
  pairImages(): void {
    this.imagePairs = [];
    if (!this.galleryItem.imagesBase64 || this.galleryItem.imagesBase64.length === 0) {
      return;
    }
    for (let i = 0; i < this.galleryItem.imagesBase64.length; i += 2) {
      this.imagePairs.push(this.galleryItem.imagesBase64.slice(i, i + 2));
    }
  }

  getImageUrl(imageBase64: string): string {
    if (!imageBase64) return '';
    return `data:image/jpeg;base64,${imageBase64}`;
  }

  openLightbox(imageBase64: string): void {
    console.log('Open lightbox for image');
  }

  goBack(): void {
    this.router.navigate(['/admin/gallary-list']);
  }
}
