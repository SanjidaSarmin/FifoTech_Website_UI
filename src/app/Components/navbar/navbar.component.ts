import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isScrolled = false;
  isMobileMenuOpen = false;
  isServicesDropdownOpen = false;
  isResourcesDropdownOpen = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = (): void => {
    this.isScrolled = window.scrollY > 50;
  };

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleServicesDropdown() {
    this.isServicesDropdownOpen = !this.isServicesDropdownOpen;
    if (this.isServicesDropdownOpen) {
      this.isResourcesDropdownOpen = false;
    }
  }

  toggleResourcesDropdown() {
    this.isResourcesDropdownOpen = !this.isResourcesDropdownOpen;
    if (this.isResourcesDropdownOpen) {
      this.isServicesDropdownOpen = false;
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.isMobileMenuOpen = false;
    this.isServicesDropdownOpen = false;
    this.isResourcesDropdownOpen = false;
  }

  closeDropdowns() {
    this.isServicesDropdownOpen = false;
    this.isResourcesDropdownOpen = false;
  }
}
