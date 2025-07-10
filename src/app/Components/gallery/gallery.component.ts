import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) { }
  galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: 'Team Meeting',
      description: 'Our team gathered for the quarterly strategy meeting to discuss upcoming projects and company goals.',
      category: 'events',
      image: 'https://via.placeholder.com/1200x600?text=Team+Meeting',
      dateAdded: new Date('2023-06-15')
    },
    {
      id: 2,
      title: 'Office Space',
      description: 'A look at our modern and collaborative workspace designed to foster creativity and productivity.',
      category: 'office',
      image: 'https://via.placeholder.com/1200x600?text=Office+Space',
      dateAdded: new Date('2023-05-22')
    },
    {
      id: 3,
      title: 'Company Event',
      description: 'Annual company celebration recognizing employee achievements and milestones.',
      category: 'events',
      image: 'https://via.placeholder.com/1200x600?text=Company+Event',
      dateAdded: new Date('2023-04-10')
    },
    {
      id: 4,
      title: 'Team Building',
      description: 'Outdoor team building activities to strengthen collaboration and communication.',
      category: 'events',
      image: 'https://via.placeholder.com/1200x600?text=Team+Building',
      dateAdded: new Date('2023-03-18')
    },
    {
      id: 5,
      title: 'Workshop',
      description: 'Professional development workshop on the latest industry trends and technologies.',
      category: 'events',
      image: 'https://via.placeholder.com/1200x600?text=Workshop',
      dateAdded: new Date('2023-02-28')
    },
    {
      id: 6,
      title: 'Conference',
      description: 'Representing our company at the annual industry conference and exhibition.',
      category: 'events',
      image: 'https://via.placeholder.com/1200x600?text=Conference',
      dateAdded: new Date('2023-01-15')
    },
    {
      id: 7,
      title: 'Cafeteria',
      description: 'Our relaxing break area designed for employees to recharge and socialize during breaks.',
      category: 'office',
      image: 'https://via.placeholder.com/1200x600?text=Cafeteria+Space',
      dateAdded: new Date('2023-01-01')
    },
    {
      id: 8,
      title: 'Meeting Room',
      description: 'Our modern meeting spaces equipped with the latest technology for effective collaboration.',
      category: 'office',
      image: 'https://via.placeholder.com/1200x600?text=Meeting+Room',
      dateAdded: new Date('2022-12-15')
    },
    {
      id: 9,
      title: 'Product Launch',
      description: 'The exciting launch of our latest product line, showcasing innovation and quality.',
      category: 'events',
      image: 'https://via.placeholder.com/1200x600?text=Product+Launch',
      dateAdded: new Date('2022-11-20')
    }
  ];

  filteredItems: GalleryItem[] = [];
  categories: string[] = [];
  currentItem: GalleryItem | null = null;
  lightboxActive = false;
  activeFilter = 'all';

  ngOnInit() {
    this.filteredItems = [...this.galleryItems];
    this.extractCategories();
  }

  extractCategories() {
    const categorySet = new Set<string>();
    this.galleryItems.forEach(item => categorySet.add(item.category));
    this.categories = Array.from(categorySet);
  }

  filterGallery(category: string) {
    this.activeFilter = category;
    if (category === 'all') {
      this.filteredItems = [...this.galleryItems];
    } else {
      this.filteredItems = this.galleryItems.filter(item => item.category === category);
    }
  }

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

  viewDetails(item: GalleryItem): void {
    this.router.navigate(['/gallery', item.id]);
  }
}
