import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryItem } from '../gallery/gallery.component';

@Component({
  selector: 'app-gallery-details',
  templateUrl: './gallery-details.component.html',
  styleUrls: ['./gallery-details.component.scss']
})
export class GalleryDetailsComponent implements OnInit {
  galleryItem: GalleryItem | null = null;
  private galleryItems: GalleryItem[] = [
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

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.galleryItem = this.galleryItems.find(item => item.id === id) || null;
    
    if (!this.galleryItem) {
      // Handle item not found - maybe redirect to gallery
      this.router.navigate(['/gallery']);
    }
  }

  goBack(): void {
    this.router.navigate(['/gallery']);
  }
}
