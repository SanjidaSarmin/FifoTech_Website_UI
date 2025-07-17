import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/Contact/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contact: any;
  isEditModalOpen = false;

  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  showNotification: boolean = false;
  

  editableContact = {
    addressesString: '',
    emailsString: '',
    phoneString: '',
  };


  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContact();
  }

  loadContact(): void {
    this.contactService.getContact().subscribe({
      next: (data) => this.contact = data,
      error: (err) => console.error('Failed to fetch contact:', err)
    });
  }

  openEditModal(): void {
    console.log('Opening modal');
    if (!this.contact) return;

    this.editableContact = {
      addressesString: (this.contact.addresses || []).join('\n'),
      emailsString: this.contact.emails?.join(', ') || '',
      phoneString: this.contact.phoneNumbers?.join(', ') || ''
    };
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  submitEdit(): void {
    const updated = {
      addresses: this.editableContact.addressesString.split('\n').map(a => a.trim()).filter(a => a),
      emails: this.editableContact.emailsString.split(',').map(e => e.trim()),
      phoneNumbers: this.editableContact.phoneString.split(',').map(p => p.trim()),
    };

    this.contactService.updateContact(updated).subscribe({
      next: (res) => {
       
        this.contact = res;
        this.isEditModalOpen = false;
      },
      error: (err) => {
        this.showNotificationMessage('Contact Update failed', 'error');
        console.error('Failed to update contact:', err)
      }
    });
  }

  showNotificationMessage(message: string, type: 'success' | 'error') {
    this.message = message;
    this.messageType = type;
    this.showNotification = true;
  
    setTimeout(() => {
      this.showNotification = false;
      this.message = '';
      this.messageType = '';
    }, 4000); // hides after 4 seconds
  }
}
