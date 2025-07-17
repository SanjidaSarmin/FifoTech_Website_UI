import { Component, OnInit, HostListener, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CareerService } from 'src/app/services/career/career.service';

declare var $: any; // For jQuery


@Component({
  selector: 'app-carrer',
  templateUrl: './carrer.component.html',
  styleUrls: ['./carrer.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideInOut', [
      state('in', style({
        height: '*',
        opacity: 1,
        visibility: 'visible',
        overflow: 'hidden',
        padding: '1.5rem',
        marginTop: '1rem'
      })),
      state('out', style({
        height: '0',
        opacity: 0,
        visibility: 'hidden',
        padding: '0 1.5rem',
        margin: 0,
        overflow: 'hidden'
      })),
      transition('in <=> out', animate('300ms ease-in-out'))
    ]),

  ]
})

export class CarrerComponent implements OnInit{
  careers: any = [];
  constructor(private careerService: CareerService) {}

  ngOnInit(): void {
    this.careerService.getAllCareers().subscribe((data: any) => {
      this.careers = (data as any[]).map(item => ({
        ...item,
        isOpen: true
      }));
    });
  }
  
  


  benefits: any[] = [
    {    
      title: 'Performance Bonuses',
      description: 'Monthly performance incentives and recognition programs.'
    },
    {     
      title: 'Career Advancement',
      description: 'Clear paths for growth into leadership and specialized roles.'
    },
    {      
      title: 'Break Room Perks',
      description: 'Complimentary coffee, snacks, and meal discounts.'
    },
    {
      title: 'Supportive Team',
      description: 'Work with a collaborative and encouraging team environment.'
    }
  ];

 

  togglePosition(position: any): void {
    position.isOpen = !position.isOpen;
  }

  applyNow(position: any): void {
    console.log('Applying for position:', position.title);
    alert(`Thank you for your interest in the ${position.title} position! Our team will review your application.`);
  }


  
  shareJob(position: any, platform: string): void {
    const jobUrl = `${window.location.origin}/career#position-${position.id}`;
    const text = `Check out this ${position.title} position at Our Company!`;
    
    switch (platform) {
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(jobUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(jobUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(jobUrl)}`, '_blank');
        break;
      default:
        // Fallback for copying to clipboard
        navigator.clipboard.writeText(`${text} ${jobUrl}`);
        alert('Link copied to clipboard!');
    }
  }

}
