import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ContactService } from 'src/app/services/Contact/contact.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{
  currentYear: number = new Date().getFullYear();
  contact: any;

  constructor(private router: Router,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.loadContact();
  }
  
  navigateTo(path: string): void {
    this.router.navigate([path]).then(() => {
      window.scrollTo(0, 0); // ✅ Scrolls to top after navigation
    });
  }
  
  loadContact(): void {
    this.contactService.getContact().subscribe({
      next: (data) => this.contact = data,
      error: (err) => console.error('Failed to fetch contact:', err)
    });
  }
}
