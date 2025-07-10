import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address/address.service';
import { ContactService } from 'src/app/services/Contact/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contact: any;

  constructor(private contactService: ContactService) {}

  messageForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    content: ''
  };

  ngOnInit(): void {
    this.loadContact();
  }

  loadContact(): void {
    this.contactService.getContact().subscribe({
      next: (data) => this.contact = data,
      error: (err) => console.error('Failed to fetch contact:', err)
    });
  }


  submitMessage(): void {
    if (!this.messageForm.firstName || !this.messageForm.email || !this.messageForm.content) {
      alert("Please fill out required fields.");
      return;
    }

    const payload = {
      firstName:this.messageForm.firstName,
      lastName:this.messageForm.lastName,
      email: this.messageForm.email,
      phone: this.messageForm.phone,
      content: this.messageForm.content
    };

    this.contactService.submitMessage(payload).subscribe({
      next: () => {
        alert('Message sent successfully!');
        this.messageForm = { firstName: '', lastName: '', email: '', phone: '', content: '' };
      },
      error: (err) => {
        console.error('Failed to send message:', err);
        alert('Failed to send message');
      }
    });
  }
}

