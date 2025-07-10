import { Component, OnInit, HostListener, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

declare var $: any; // For jQuery


@Component({
  selector: 'app-carrer',
  templateUrl: './carrer.component.html',
  styleUrls: ['./carrer.component.scss'],
  encapsulation: ViewEncapsulation.None,
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

export class CarrerComponent implements OnInit, AfterViewInit, OnDestroy {
  scrollPosition = 0;
  isScrolled = false;

  // Stats configuration with higher values for better animation effect
  stats = [
    { id: 'support', value: 24, suffix: '/7', label: 'Support'},
    { id: 'team', value: 150, suffix: '+', label: 'Team Members' },
    { id: 'years', value: 21, suffix: '+', label: 'Years in Business'}
  ];

  // Track if animation has played
  private animationPlayed = false;
  private countersInitialized = false;
  private counterIntervals: any[] = [];

  positions: any[] = [
    {
      id: 1,
      title: 'Customer Service Representative',
      type: 'Full-time',
      location: 'On-site/Remote',
      description: 'As a Customer Service Representative, you will be the first point of contact for our customers, providing exceptional service and resolving inquiries through phone, email, and chat.',
      requirements: [
        'High school diploma or equivalent (Bachelor\'s preferred)',
        '1+ years of customer service experience',
        'Excellent verbal and written communication skills',
        'Strong problem-solving abilities',
        'Ability to work in a fast-paced environment',
        'Basic computer proficiency'
      ],
      isOpen: true
    },
    {
      id: 2,
      title: 'Technical Support Specialist',
      type: 'Full-time',
      location: 'On-site',
      description: 'Provide technical support to customers, troubleshoot issues, and ensure customer satisfaction while maintaining service level agreements.',
      requirements: [
        'Associate degree in IT or related field (or equivalent experience)',
        '2+ years of technical support experience',
        'Strong troubleshooting skills',
        'Knowledge of CRM systems',
        'Ability to explain technical issues clearly',
        'Bilingual (preferred)'
      ],
      isOpen: true
    }
  ];

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

  constructor() { }

  ngOnInit(): void {
    // Initialization code here
  }

  ngAfterViewInit(): void {
    this.initScrollAnimation();
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll.bind(this));
    // Clear all intervals to prevent memory leaks
    this.counterIntervals.forEach(interval => clearInterval(interval));
  }

  private initScrollAnimation(): void {
    this.checkIfInView();
  }

  private onScroll(): void {
    this.checkIfInView();
  }

  private checkIfInView(): void {
    if (this.animationPlayed) return;

    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    const isInView = (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );

    if (isInView) {
      this.animationPlayed = true;
      this.animateCounters();
    }
  }

  onStatsVisible(isVisible: boolean): void {
    if (isVisible && !this.countersInitialized) {
      this.animateCounters();
    }
  }

  private animateCounters(): void {
    if (this.countersInitialized) return;
    
    // Clear any existing intervals
    this.counterIntervals.forEach(interval => clearInterval(interval));
    this.counterIntervals = [];
    
    this.stats.forEach(stat => {
      const element = document.querySelector(`#stat-${stat.id} .counter`);
      if (!element) return;
      
      const target = stat.value;
      const duration = 2000; // 2 seconds
      const stepTime = 30; // 30ms per step for smoother animation
      const steps = duration / stepTime;
      const valueIncrement = target / steps;
      let current = 0;
      
      // Reset counter to 0
      element.textContent = '0';
      
      const timer = setInterval(() => {
        current += valueIncrement;
        if (current >= target) {
          element.textContent = target.toString();
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(current).toString();
        }
      }, stepTime);
      
      this.counterIntervals.push(timer);
    });
    
    this.countersInitialized = true;
  }

  togglePosition(position: any): void {
    // Close all other positions
    if (!position.isOpen) {
      this.positions.forEach(p => {
        if (p.id !== position.id) {
          p.isOpen = false;
        }
      });
    }
    
    // Toggle the clicked position
    position.isOpen = !position.isOpen;
  }
  
  applyNow(position: any): void {
    // In a real app, this would navigate to an application form
    // For now, we'll just log and show an alert
    console.log('Applying for position:', position.title);
    alert(`Thank you for your interest in the ${position.title} position! Our team will review your application.`);
  }

  scrollTo(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };
    
    for (const [unit, seconds] of Object.entries(intervals)) {
      const interval = Math.floor(diffInSeconds / seconds);
      if (interval >= 1) {
        return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
      }
    }
    
    return 'Just now';
  }


}
