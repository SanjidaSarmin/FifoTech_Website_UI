import { Component, OnInit, AfterViewInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

declare const AOS: any;

interface CompanyFeature {
  icon: string;
  text: string;
}

interface StatItem {
  value: number;
  label: string;
}

interface TeamStat {
  icon: string;
  value: string;
  label: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-in-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AboutComponent implements OnInit, AfterViewInit {
  companyFeatures: CompanyFeature[] = [
    { icon: 'fas fa-check-circle', text: '10+ Years of Experience' },
    { icon: 'fas fa-check-circle', text: '24/7 Customer Support' },
    { icon: 'fas fa-check-circle', text: 'Certified Professionals' },
    { icon: 'fas fa-check-circle', text: '100+ Happy Clients' }
  ];

  stats: StatItem[] = [
    { value: 10, label: 'Years Experience' },
    { value: 100, label: 'Projects Completed' },
    { value: 50, label: 'Team Members' },
    { value: 98, label: 'Client Satisfaction' }
  ];

  teamStats: TeamStat[] = [
    { icon: 'fas fa-users', value: '50', label: 'Team Members' },
    { icon: 'fas fa-trophy', value: '100', label: 'Projects Done' },
    { icon: 'fas fa-smile', value: '98', label: 'Happy Clients' }
  ];

  constructor(private router: Router) {}
    navigateTo(path: string): void {
      this.router.navigate([path]).then(() => {
        window.scrollTo(0, 0); // ✅ Scrolls to top after navigation
      });
    }
  

  ngOnInit(): void {
    this.initializeAOS();
  }

  ngAfterViewInit(): void {
    this.initializeCounter();
  }

  private initializeAOS(): void {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        disable: window.innerWidth < 768
      });
    }
  }


  private initializeCounter(): void {
    const counterElements = document.querySelectorAll('.counter');
    if (!counterElements.length) return;

    const speed = 200;

    const animateCounter = (element: Element | null): void => {
      if (!(element instanceof HTMLElement)) return;
      
      const target = parseInt(element.getAttribute('data-count') || '0', 10);
      const count = parseInt(element.textContent || '0', 10);
      const increment = target / speed;

      if (count < target) {
        const newCount = Math.ceil(count + increment);
        element.textContent = newCount.toString();
        setTimeout(() => animateCounter(element), 10);
      } else {
        element.textContent = target.toString();
      }
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observerInstance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counterElements.forEach(counter => {
      if (counter) {
        observer.observe(counter);
      }
    });
  }

  // Add this method to handle window resize for AOS
  onResize(event: Event): void {
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  }
}
