import { Component, OnInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isScrolled = false;
  isMobileMenuOpen = false;
  isProfileDropdownOpen = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
  }


  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']); // ✅ Angular way
  }

  onScroll = (): void => {
    this.isScrolled = window.scrollY > 50;
  };

  @ViewChild('dropdownRef') dropdownRef!: ElementRef;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleProfileDropdown(): void {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.dropdownRef?.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isProfileDropdownOpen = false;
    }
  }
}


