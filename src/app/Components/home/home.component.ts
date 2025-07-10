import { Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger,
  group,
  keyframes
} from '@angular/animations';
import { BusinessService } from 'src/app/services/businesServices/business.service';

type ScrollElement = {
  element: ElementRef;
  isVisible: boolean;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('slideAnimation', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition('* => void', [
        animate('500ms ease-in', style({ opacity: 0, transform: 'translateX(50px)' }))
      ])
    ]),
    trigger('hrAnimation', [
      transition('* => *', [
        style({ width: 0 }),
        animate('800ms 300ms ease-out', style({ width: '80px' }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('aboutSection') aboutSection!: ElementRef;
  @ViewChild('aboutLeft') aboutLeft!: ElementRef;
  @ViewChild('aboutRight') aboutRight!: ElementRef;
  @ViewChild('outsourcingSection') outsourcingSection!: ElementRef;
  @ViewChild('outsourcingText') outsourcingText!: ElementRef;
  @ViewChild('outsourcingImage') outsourcingImage!: ElementRef;

  hovering = false;
  currentSlide = 0;
  isHrAnimated = false;
  private observer!: IntersectionObserver;
  constructor(
    private businessService: BusinessService,
    private router: Router
  ) {}

  navigateToContact() {
    this.router.navigate(['/contact']).then(() => {
      window.scrollTo(0, 0);
    });
  }

  navigateToServices() {
    this.router.navigate(['/services']).then(() => {
      window.scrollTo(0, 0);
    });
  }

  carouselItems = [
    
    {
      title: 'We Ensure Your Presence in The Global World',
      description: 'Provide a full range of Outsourcing Services, IT Services, and Solutions to businesses and industry leaders, both large and small.',
      image: 'assets/global.jpg'
    },
    {
      title: 'Contact Center Services',
      description: 'FIFOTech Contact Center services design its process as per our client\'s requirements with adaptability & flexibility.',
      image: 'assets/call_centre.jpg',
    },
    {
      title: 'Software Design & Development',
      description: 'FIFOTech develops static and dynamic applications providing unique design and bug-free development.',
      image: 'assets/softwere.jpg'
    },

    {
      title: 'Back Office Services',
      description: 'FIFOTech provides extensive Back-Office Services with high accuracy in maintaining the deadline.',
      image: 'assets/back_office.jpg'
    },
    {
      title: 'Digital Marketing',
      description: 'FIFOTech Digital Marketing Services will help your business connect with your targeted audience and boost up your business.',
      image: 'assets/degital_marketing.jpeg'
    },
    {
      title: 'Creative Design Services',
      description: 'FIFOTech Creative Design Services are highly effective & innovative having a qualified & skilled team of designers, video editors, and content developers.',
      image: 'assets/creative_design.jpg',
    },
    {
      title: 'Skills Development',
      description: 'FIFOTech imparts world-class training ranging from basic to advanced IT training, technical training to clients in the public and private sector in different areas of the country.',
      image: 'assets/skill.jpg',
    },
    {
      title: 'Career Growth',
      description: 'FIFOTech empowers your professional journey with continuous learning, mentorship, and growth opportunities in a dynamic work environment.',
  image: 'assets/career_growth.jpg',
    }
  ];
  private slideInterval: any;
  
    services: any[] = [];
    currentPage: number = 0;
    pageSize: number = 10;
    totalPages: number = 0;
    totalItems: number = 0;
  
    isLoading = false;
    errorMessage = '';

  
    navigateToService(id: number): void {
      this.router.navigate(['/services', id]).then(() => {
        window.scrollTo(0, 0);
      });
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

  

  ngOnInit() {
    this.fetchServices();
    this.startSlideShow();
    // Start the horizontal line animation after component initializes
    setTimeout(() => {
      this.isHrAnimated = true;
    }, 300);

    // Initialize intersection observer
    this.initIntersectionObserver();
  }

  startSlideShow() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 6000);
  }

  nextSlide() {
    this.isHrAnimated = false;
    setTimeout(() => {
      this.currentSlide = (this.currentSlide + 1) % this.carouselItems.length;
      this.resetHrAnimation();
    }, 100);
  }

  prevSlide() {
    this.isHrAnimated = false;
    setTimeout(() => {
      this.currentSlide = (this.currentSlide - 1 + this.carouselItems.length) % this.carouselItems.length;
      this.resetHrAnimation();
    }, 100);
  }

  resetHrAnimation() {
    // Reset the animation by toggling the flag
    setTimeout(() => {
      this.isHrAnimated = true;
    }, 50);
  }

  goToSlide(index: number) {
    this.isHrAnimated = false;
    this.currentSlide = index;
    this.resetSlideTimer();
    this.resetHrAnimation();
  }


  resetSlideTimer() {
    clearInterval(this.slideInterval);
    this.startSlideShow();
  }

  ngAfterViewInit() {
    // Observe elements after view is initialized
    if (this.aboutLeft?.nativeElement) {
      this.observer.observe(this.aboutLeft.nativeElement);
    }
    if (this.aboutRight?.nativeElement) {
      this.observer.observe(this.aboutRight.nativeElement);
    }
    if (this.outsourcingText?.nativeElement) {
      this.observer.observe(this.outsourcingText.nativeElement);
    }
    if (this.outsourcingImage?.nativeElement) {
      this.observer.observe(this.outsourcingImage.nativeElement);
    }
  }

  private initIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2 // Trigger when 20% of the element is visible
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, options);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // This is handled by the IntersectionObserver
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }
  selectedTab: string = 'client';
  allLogos = [
    { src: 'assets/Bangladesh-Govt.png', alt: 'Bangladesh Government', category: 'client' },
    { src: 'assets/ICT-Division.png', alt: 'ICT Division', category: 'client' },
    { src: 'assets/satistics.jpeg', alt: 'Statistics', category: 'client' },
    { src: 'assets/Hi-Tech-Park.png',alt: 'Hi-tech-park',  category: 'client' },
    { src: 'assets/BTEB.png', alt: 'BTEB', category: 'client' },
    { src: 'assets/DPDC.png', alt: 'DPDC', category: 'client' },
    { src: 'assets/She-Power.png',alt: 'She-power',  category: 'client' },
    { src: 'assets/her_power.jpeg', alt: 'her-power', category: 'client' },
    { src: 'assets/BSCIC.png', alt: 'BSCIC', category: 'client' },
    { src: 'assets/SEIP.png', alt: 'SEIP', category: 'client' },
    { src: 'assets/Nogod.jpg', alt: 'Nogod', category: 'client' },
    { src: 'assets/Robi.png', alt: 'Robi', category: 'client' },
    { src: 'assets/jti.png', alt: 'JTI', category: 'client' },
    { src: 'assets/Akij-Group.png', alt: 'Akij Group', category: 'client' },
    { src: 'assets/AKG.png', alt: 'AKG', category: 'client' },
    { src: 'assets/Logitech.png', alt: 'Logitech', category: 'client' },
    { src: 'assets/Payoneer.png', alt: 'Payoneer', category: 'client' },
    { src: 'assets/Samsung.png', alt: 'Samsung', category: 'client' },
    { src: 'assets/Symphony.jpg', alt: 'Symphony', category: 'client' },
    { src: 'assets/Fair-Mart.png', alt: 'Fair Mart', category: 'client' },
    { src: 'assets/Akash.png', alt: 'Akash', category: 'client' },
    { src: 'assets/Surecash.png', alt: 'Sure_Cash', category: 'client' },
    { src: 'assets/Digicon.png', alt: 'Digicon', category: 'client' },
    { src: 'assets/My-Outsourcing-.png', alt: 'OutSourcing', category: 'client' },
    { src: 'assets/Market-Express.png', alt: 'Market-Express', category: 'client' },
    { src: 'assets/IFC.png', alt: 'IFC', category: 'client' },
    { src: 'assets/Plan-International.png', alt: 'Plan_international', category: 'client' },
    { src: 'assets/CNC.png', alt: 'CNC', category: 'client' },
    { src: 'assets/BT.png', alt: 'BT', category: 'client' },
    { src: 'assets/WIndmill.png', alt: 'WindMill', category: 'client' },
    { src: 'assets/BD-Cham.png', alt: 'BD-Charm', category: 'client' },
    { src: 'assets/A2zIT.png', alt: 'A-ZIT', category: 'client' },


    { src: 'assets/basis.jpeg', alt: 'BASIS', category: 'member' },
    { src: 'assets/Bacco.jpeg', alt: 'BACCO', category: 'member' },
    { src: 'assets/ecab.jpeg', alt: 'ECAB', category: 'member' },
    { src: 'assets/FBCCI.jpeg', alt: 'FBCCI', category: 'member' },


    { src: 'assets/certificate-1.png', alt: 'Certificate-1', category: 'certificate' },
    { src: 'assets/certificate-2.jpeg', alt: 'Certificate-1', category: 'certificate' }

    // Add more with correct category
  ];

  get filteredLogos() {
    return this.allLogos.filter(logo => logo.category === this.selectedTab);
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

 
   

}
